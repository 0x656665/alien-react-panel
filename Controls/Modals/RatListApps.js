import React from 'react';
import { isNullOrUndefined } from 'util';


class RatListApps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayApps: props.arrayApps
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            arrayApps: newProps.arrayApps
        });
    }

    

    render() {
           
    
        let linksHtml = [];

        let jsonApps = '';
        try{
            jsonApps = JSON.parse(this.state.arrayApps);
        }catch(err){}

        let array_apps =[];
        let k_i = 0;
        for(let k in jsonApps) {
            array_apps[k_i] = jsonApps[k];
            k_i++;
        }


        array_apps.forEach(function(lnk) {
            if(lnk.length > 0) {

                linksHtml.push(<li class="list-group-item-apps" >

                <i style={({marginLeft: '5px'})} aria-hidden="true"></i>

                <span style={({marginLeft: '8px'})}>{lnk}</span>
              
                </li>);
            }
        }.bind(this));
      

        return(
            <div class='div_filemanager'>
                <React.Fragment>
                    <ul class="list-group list-group-flush array_file_manager">
                        {linksHtml}
                    </ul>
                </React.Fragment>
            </div>
        );
    }
}

export default RatListApps;