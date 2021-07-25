import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';

class dbRow extends React.Component {

 

   

    render () {
      
        const TextAlignleft = {
            textAlign: 'left'
           
        }
      
        
        const TextAlignRight = {
            textAlign: 'right'
           
        }

        let icon = 'far fa-circle';
        let styled = {color: '#8a8a8a'};

        if(this.props.stat == '1'){
             icon = 'far fa-check-circle';
            styled = {color: '#5cb646'};
        }
        
        return (
            <tr><td></td>

            <th style={TextAlignleft}>{this.props.nums}</th>
            <th style={TextAlignRight}><i class={icon} style={styled}>  </i></th>

            </tr>
        );
    }
}

export default dbRow;