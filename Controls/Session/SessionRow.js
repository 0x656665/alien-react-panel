import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';

class SessionRow extends React.Component {



    onLoadJson (sid) {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"session_closed","sid":"'+sid+'"}').toString('base64')
            }
        });
       

        request.done(function(msg) {
            try_eval('$.notify("Session is disabled: '+ sid +'", "info");');
        }.bind(this));
    }

    render () {
        const TextAlignCenter = {
            textAlign: 'center'
        }
      
        let closed  = "";
        if(this.props.closed != '1'){
             closed = "far fa-times-circle";
        }
        
        return (
            <tr>
                   <th style={TextAlignCenter}>{this.props.session_id}</th>
                   <th style={TextAlignCenter}>{this.props.fingerprint}</th>
                   <th style={TextAlignCenter}>{this.props.last_date}</th>
                   
                   <th style={TextAlignCenter}><a class={closed} onClick={this.onLoadJson.bind(this, this.props.session_id)}></a></th>
            </tr>
        );
    }
}

export default SessionRow;