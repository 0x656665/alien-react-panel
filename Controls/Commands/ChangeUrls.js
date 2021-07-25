import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

class ChangeUrls extends React.Component {

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
            try_eval('$.notify("Added command [change_url_connect]", "info");');
            SettingsContext.BotSendCommand('{"cmd":"change_url_connect","u":"' + this.state.phone + '","k":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
          
        }
    }

    render () {
        return (
            <React.Fragment>
              
                <div class="modal fade" id="modalChangeUrls" tabindex="-1" role="dialog" aria-labelledby="modalChangeUrls" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Change url connection</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="http://domain.com" />
                                <input class="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="key" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickSendSMS} class="btn btn-outline-primary"  data-dismiss="modal">Send</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default ChangeUrls;