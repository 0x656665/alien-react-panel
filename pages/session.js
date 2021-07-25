import React from 'react';
import SessionTable from '../Controls/Session/SessionTable';

import SettingsContext from '../Settings';


class session extends React.Component {
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
                <br/><center><h5 class="pageh disable-select">User session admin panel</h5></center> <br/>
               
                    <SessionTable InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                
            </div>
        </React.Fragment>
        );
    }
}

export default session;