import React from 'react';
import FilesTable from '../Controls/Files/FileTable';

import SettingsContext from '../Settings';


class files extends React.Component {
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
                <br/><center><h5 class="pageh disable-select">Files</h5></center> <br/>
               
                    <FilesTable InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                
            </div>
        </React.Fragment>
        );
    }
}

export default files;