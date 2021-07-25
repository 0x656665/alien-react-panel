import React from 'react';
import SettingsContext from '../../Settings';

class EditTimesSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail,
            admin_T: SettingsContext.admin_T,
            permission_T: SettingsContext.permission_T
        };
    }

    componentWillReceiveProps() {
        this.setState({
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail,
            admin_T: SettingsContext.admin_T,
            permission_T: SettingsContext.permission_T
        });
    }

    changeAdmin(event){
        SettingsContext.admin_T = event.target.value;
        this.saveAllSettings();
    }

    changePermission(event){
        SettingsContext.permission_T = event.target.value;
        this.saveAllSettings();
    }


    changeInject(event){
        SettingsContext.timeInject = event.target.value;
        this.saveAllSettings();
    }

    changeCC(event){
        SettingsContext.timeCC = event.target.value;
        this.saveAllSettings();
    }

    changeMail(event){
        SettingsContext.timeMail = event.target.value;
        this.saveAllSettings();
    }

    saveAllSettings() {
        this.setState({
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail,
            admin_T: SettingsContext.admin_T,
            permission_T: SettingsContext.permission_T
        });
        SettingsContext.SaveSettingsServer();
    }

    returnDelay() {
        return(
            <React.Fragment>
                <option value="-1">disable</option>
                <option value="10">10 sec</option>
                <option value="15">15 sec</option>
                <option value="20">20 sec</option>
                <option value="30">30 sec</option>
                <option value="45">45 sec</option>
                <option value="60">1 min</option>
                <option value="120">2 min</option>
                <option value="180">3 min</option>
                <option value="240">4 min</option>
                <option value="300">5 min</option>
                <option value="360">6 min</option>
                <option value="480">8 min</option>
                <option value="600">10 min</option>
                <option value="900">15 min</option>
                <option value="1800">30 min</option>
                <option value="2700">45 min</option>
                <option value="3600">1 hour</option>
                <option value="7200">2 hour</option>
                <option value="14400">4 hour</option>
                <option value="28800">8 hour</option>
                <option value="36000">10 hour</option>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
            <div class="form-group" style={({marginBottom:'0px'})}>

                <label for="timeAdminDelay">Enable admin device</label>
                <select class="form-control" id="timeCCDelay" onChange={this.changeAdmin.bind(this)} value={this.state.admin_T}>
                    {this.returnDelay()}
                </select>

                <label for="timePermissionDelay">Enable request permissions</label>
                <select class="form-control" id="timeCCDelay" onChange={this.changePermission.bind(this)} value={this.state.permission_T}>
                    {this.returnDelay()}
                </select>

                <label for="timeInjectDelay">Enable injection banks</label>
                <select class="form-control" id="timeCCDelay" onChange={this.changeInject.bind(this)} value={this.state.timeInject}>
                    {this.returnDelay()}
                </select>
                <p></p>
                <label for="timeCCDelay">Enable injection credit cards</label>
                <select class="form-control" id="timeCCDelay" onChange={this.changeCC.bind(this)} value={this.state.timeCC}>
                    {this.returnDelay()}
                </select>
                <p></p>
                <label for="timeMailDelay">Enable injection emails</label>
                <select class="form-control" id="timeMailDelay" onChange={this.changeMail.bind(this)} value={this.state.timeMail}>
                    {this.returnDelay()}
                </select>
                <p></p>
            </div>
            </React.Fragment>
        );
    }
}

export default EditTimesSettings;