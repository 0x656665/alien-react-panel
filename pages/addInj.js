import React from 'react';
import InjectTable from '../Controls/InjectsTable/InjectTable';
import SettingsContext from '../Settings';
import AddInjectForm from '../Controls/InjectsTable/AddInjectForm';

class AddInject extends React.Component {
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
                <br/><center><h5 class="pageh disable-select">List Injections</h5></center> <br/>
                    <AddInjectForm InjListForceUpdate={this.InjListForceUpdate} />
                    <InjectTable InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                
            </div>
        </React.Fragment>
        );
    }
}

export default AddInject;