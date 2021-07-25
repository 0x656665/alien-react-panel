import React from 'react';
import DbTable from '../Controls/db_mailing/dbTable';
import { try_eval } from '../serviceF';
import SettingsContext from '../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

class dbSMS extends React.Component {
    constructor(props) {
        super(props)
        this.InjListForceUpdate = this.InjListForceUpdate.bind(this)
        this.state = {
            listN: ''
        };
    }

    InjListForceUpdate() {
        this.forceUpdate();
      
    }

    sendListNumbers() {
         let request = $.ajax({
             type: 'POST',
             url: SettingsContext.url_connect,
             data: {
                 'params': new Buffer('{"sent_request":"add_list_numbers","listArray":"' + this.state.listN  + '"}').toString('base64')
             }
         });
         
         request.done(function(msg) {
                    this.forceUpdate();
                     try_eval('$.notify("Added", "info");');
                     try_eval('document.getElementById("listText").value = "";');
                     this.setState({
                        listN: ''
                     });
         }.bind(this));
     }

     cleanList() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"clean_list_numbers"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            
                    this.forceUpdate();
                    try_eval('$.notify("Clean database numbers", "info");');
               
        }.bind(this));
    }

    listN_f(event) {
        this.setState({listN: event.target.value});
    }

    render () {
       
        return (
        <React.Fragment>
            <div class="row">
                <div class="col">
                <br/><center><h5 class="pageh disable-select">Numbers for mailing sms</h5></center> <br/>

                <input id="listText" onChange={this.listN_f.bind(this)} placeholder="+123435545, +212332434, +2324533435" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                <button class="btn btn-outline-primary" onClick={this.sendListNumbers.bind(this)}>Add list numbers</button> 
                <button class="btn btn-outline-primary"  onClick={this.cleanList.bind(this)} style={({marginLeft: '10px'})}>Clean list</button> 
            
               <br/> <br/>

               
                    <DbTable InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                
            </div>
        </React.Fragment>
        );
    }
}

export default dbSMS;