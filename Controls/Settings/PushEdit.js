import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';

class PushEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pushTitle: SettingsContext.pushTitle,
            pushText: SettingsContext.pushText
        };
    }

    componentWillReceiveProps() {
        this.setState({
            pushTitle: SettingsContext.pushTitle,
            pushText: SettingsContext.pushText
        });
    }

    handleChangeTitle(event) {
        this.setState({pushTitle: event.target.value});
    }

    handleChangeText(event) {
        this.setState({pushText: event.target.value});
    }

    onKeyUP = (e) => {
        if (e.keyCode == 13) {
            this.SaveSettingsThis();
        }
    }

    SaveSettingsThis() {
        SettingsContext.pushTitle = this.state.pushTitle;
        SettingsContext.pushText = this.state.pushText;
        SettingsContext.SaveSettingsServer();
        try_eval('$.notify("Saved setting notification", "info");');
    }

    render() {
        return(
            <React.Fragment>
                <label for="pushTitle">Title</label>
                <input id="pushTitle" value={this.state.pushTitle} onChange={this.handleChangeTitle.bind(this)} onKeyUp={this.onKeyUP.bind(this)} placeholder="Enter title" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                <label for="pushText">Text</label>
                <input id="pushText" value={this.state.pushText} onChange={this.handleChangeText.bind(this)} onKeyUp={this.onKeyUP.bind(this)} placeholder="Enter text" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                <button type="button" class="btn btn-outline-primary" style={({float:'center', width: '120px'})} onClick={this.SaveSettingsThis.bind(this)}>Save</button>
            </React.Fragment>
        );
    }
}

export default PushEdit;