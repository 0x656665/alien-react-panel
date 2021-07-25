import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import OnOffSwitcher from './OnOffSwitcher';
import InjectListNamer from './InjectListNamer';

class BotSortModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            findID: SettingsContext.findID,
            findTAG: SettingsContext.findTAG,
            findAPP:  SettingsContext.findAPP,
            botOnline: SettingsContext.BotsFilterMode[0],
            botOffline: SettingsContext.BotsFilterMode[1],
            botDead: SettingsContext.BotsFilterMode[2],
            botHaveExistBanks: SettingsContext.BotsFilterMode[3],
            botHaveNotExistBanks: SettingsContext.BotsFilterMode[4],
            botTriggerStatBanks: SettingsContext.BotsFilterMode[5],
            botTriggerStatCC: SettingsContext.BotsFilterMode[6],
            botTriggerStatMail: SettingsContext.BotsFilterMode[7],
            botPhoneNumber: SettingsContext.BotsFilterMode[8],
            botComments: SettingsContext.BotsFilterMode[9],
            botProtection: SettingsContext.BotsFilterMode[10],
            botUnlock: SettingsContext.BotsFilterMode[11],
            botsPerPage: SettingsContext.BotsPerPage
        };
    }
    /**
    1 - online
    2 - offline
    3 - dead
    4 - Exist App Banks
    5 - No Exist App Banks
    6 - statBank==1
    7 - statCC==1
    8 - statMail==1
     */

    componentWillReceiveProps() {

    }

    ChangeSettings() {
        this.props.BotListForceUpdate();
        SettingsContext.SaveSettingsCookies();
    }

    HideThisModal() {
        try_eval('$("#BotSortTableModal").modal("hide");');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    componentDidMount() {
        try_eval('UpdateToolTips();');
    }

    callbackBtn(Value, BtnParam) {
        if(BtnParam == "botOnline"){
            this.state.botOnline = Value;
        }
        else if(BtnParam == "botOffline"){
            this.state.botOffline = Value;
        }
        else if(BtnParam == "botDead"){
            this.state.botDead = Value;
        }
        else if(BtnParam == "botHaveExistBanks"){
            this.state.botHaveExistBanks = Value;
        }
        else if(BtnParam == "botHaveNotExistBanks"){
            this.state.botHaveNotExistBanks = Value;
        }
        else if(BtnParam == "botTriggerStatBanks"){
            this.state.botTriggerStatBanks = Value;
        }
        else if(BtnParam == "botTriggerStatCC"){
            this.state.botTriggerStatCC = Value;
        }
        else if(BtnParam == "botTriggerStatMail"){
            this.state.botTriggerStatMail = Value;
        }
        else if(BtnParam == "botPhoneNumber"){
            this.state.botPhoneNumber = Value;
        }
        else if(BtnParam == "botComments"){
            this.state.botComments = Value;
        }
        else if(BtnParam == "botProtection"){
            this.state.botProtection = Value;
        }
        else if(BtnParam == "botUnlock"){
            this.state.botUnlock = Value;
        }
        this.SaveSettings();
    }


    SaveSettings() {
        SettingsContext.BotsFilterMode =
            this.state.botOnline + 
            this.state.botOffline + 
            this.state.botDead + 
            this.state.botHaveExistBanks + 
            this.state.botHaveNotExistBanks + 
            this.state.botTriggerStatBanks + 
            this.state.botTriggerStatCC + 
            this.state.botTriggerStatMail +
            this.state.botPhoneNumber +
            this.state.botComments + 
            this.state.botProtection +
            this.state.botUnlock;
        SettingsContext.BotsPerPage = this.state.botsPerPage;
        this.ChangeSettings();
        this.HideThisModal();
    }

    checkOnlyNumbers(val) {
        return parseInt(val) ? true : false;
    }

    onChangeBotsPerPage = (e) => {
        if(this.checkOnlyNumbers(e.target.value)) {
            this.setState({ 
                botsPerPage: parseInt(e.target.value.substring(0,3))
            });
        }
        else if(e.target.value == '') {
            this.setState({ 
                botsPerPage: ''
            });
        }
    }

    OnFocusChange = (e) => {
        if(e.target.value == '') {
            this.setState({ 
                botsPerPage: SettingsContext.BotsPerPage
            });
        }
    }

    onChangeID = (e) => {
        SettingsContext.findID =  e.target.value;
        this.SaveSettings();
    }

    onChangeTAG = (e) => {
        SettingsContext.findTAG =  e.target.value;
        this.SaveSettings();
    }

    onChangeAPP = (e) => {
        SettingsContext.findAPP =  e.target.value;
        this.SaveSettings();
    }

updateFilter() {
    SettingsContext.findID =  '';
    SettingsContext.findTAG =  '';
    SettingsContext.findAPP =  '';
    try_eval('$.notify("Clean find filter", "info");');
    this.SaveSettings();
}
    render() {
        return (
          //<!-- Modal -->
                   
                    <div id="divFilter" style={({verflow: 'hidden'})}>
                              <center> 
                              <div style={({ display:'flex', alignItems: 'center', justifyContent: 'center'})}>
                                <div class="check-bot" style={({ fontSize: '1rem', marginTop: '13px'})}>
                                    <i data-placement="bottom"  data-toggle="tooltip"  onClick={this.updateFilter.bind(this)} class="fas fa-sync"/>
                                </div>
                               
                            
                                <input class="form-control" style={({marginLeft: '20px', width: '15%', height: '30px'})}  onChange={this.onChangeID} placeholder={'ID ' + this.state.findID}  />
                                <input class="form-control" style={({marginLeft: '20px', width: '15%', height: '30px'})}  onChange={this.onChangeTAG} placeholder={'Tag ' + this.state.findTAG}  />
                                <input class="form-control" style={({marginLeft: '20px', width: '15%', height: '30px'})}  onChange={this.onChangeAPP} placeholder={'App ' + this.state.findAPP}  />
                                
                                </div>
                                <br/> <br/>

                                <table id="tableFilter">

                                    <td>
                                     <i>Online </i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botOnline"} status={this.state.botOnline} />
                                    <br/><br/>
                                     <i>Offline </i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botOffline"} status={this.state.botOffline} />
                                    </td>
                                
                                    <td>  
                                      <i>Dead</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botDead"} status={this.state.botDead} />
                                    <br/><br/>
                                      <i>Logs Banks </i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatBanks"} status={this.state.botTriggerStatBanks} />
                                     </td>
                                
                                    <td>
                                     <i>Logs Credit Cards</i> <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatCC"} status={this.state.botTriggerStatCC} />
                                    <br/> <br/>
                                     <i>Logs Emails </i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatMail"} status={this.state.botTriggerStatMail} />
                                    </td>

                                    
                                    <td>
                                     <i>Phone Number</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botPhoneNumber"} status={this.state.botPhoneNumber} />                              
                                    <br/><br/>
                                      <i>Commects</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botComments"} status={this.state.botComments} />
                                    </td>


                                    <td>
                                     <i>Install Banks</i> <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveExistBanks"} status={this.state.botHaveExistBanks} />                              
                                    <br/><br/>
                                     <i>No Install Banks</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveNotExistBanks"} status={this.state.botHaveNotExistBanks} />
                                    </td>

                                     <td>
                                      <i>AV Protection</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botProtection"} status={this.state.botProtection} />                              
                                    <br/><br/>
                                      <i>Unlocked devices</i><OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botUnlock"} status={this.state.botUnlock} />
                                    </td>
                                </table>
                        </center>
                        <br/>
                        <div class="input-group CountperPage ">
                            <div class="form-group">
                                <select class="form-control2" id="perPage" onClick={this.SaveSettings.bind(this)} onChange={this.onChangeBotsPerPage.bind(this)} value={this.state.botsPerPage}>
                                    <option value="1">1 bot</option>
                                    <option value="3">3 bots</option>
                                    <option value="5">5 bots</option>
                                    <option value="10">10 bots</option>
                                    <option value="15">15 bots</option>
                                    <option value="20">20 bots</option>
                                    <option value="25">25 bots</option>
                                    <option value="30">30 bots</option>
                                    <option value="40">40 bots</option>
                                    <option value="50">50 bots</option>
                                    <option value="75">75 bots</option>
                                    <option value="100">100 bots</option>
                                    <option value="150">150 bots</option>
                                    <option value="200">200 bots</option>
                                    <option value="250">250 bots</option>
                                    <option value="300">300 bots</option>
                                    <option value="500">500 bots</option>
                                    <option value="750">750 bots</option>
                                    <option value="1000">1000 bots</option>
                                </select>
                            </div>
                        </div>
                    </div>
                 

                   
      );
    }
}

export default BotSortModal;