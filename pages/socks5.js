import React from 'react';
import Socks5Table from '../Controls/socks5/Socks5Table';

import SettingsContext from '../Settings';


class socks5 extends React.Component {
    constructor(props) {
        super(props)
        this.InjListForceUpdate = this.InjListForceUpdate.bind(this)
    }

    InjListForceUpdate() {
        this.forceUpdate();
      
    }

    render () {
       
        return (
        <React.Fragment>
            <div class="row">


                <div class="col">
                <br/><center><h5 class="pageh disable-select">Socks5</h5></center> <br/>
               
                    <Socks5Table InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                
            </div>
        </React.Fragment>
        );
    }
}

export default socks5;