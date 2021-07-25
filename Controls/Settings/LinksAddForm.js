import React from 'react';
import SettingsContext from '../../Settings';

class LinksAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkURLS: null,
            newLink: ''
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.setState({
            arrayUrl: ''
        });
    }

    RemoveThisLinks =(link) => {
        let links = [];
        try {
            SettingsContext.arrayUrl.split(',').forEach(function(lnk) {
                if(lnk != link) links.push(lnk);
            }.bind(this));
        } catch (err) {}
        let txtlink = ''
        links.forEach(function(lnk) {
            txtlink += lnk + ',';
        }.bind(this));
        txtlink = txtlink.slice(0, -1);
        SettingsContext.arrayUrl = txtlink;
        SettingsContext.SaveSettingsServer();
        this.forceUpdate();
    }

    UpdateAndSaveLinks(){
        
    }

    handleChange(event) {
        this.setState({newLink: event.target.value});
    }

    

    onKeyUP = (e) => {
        if (e.keyCode == 13) {
            let url = this.state.newLink;
            if(url.indexOf('http://')==-1  && url.indexOf('https://')==-1) {url = 'http://' + url;}

            SettingsContext.arrayUrl += ',' +  url;
            SettingsContext.SaveSettingsServer();
            this.setState({newLink: ''});
        }
    }

    render() {
        let links = [];
        try {
            links = SettingsContext.arrayUrl.split(',');
        }
        catch (err) {}
        let linksHtml = [];
        links.forEach(function(lnk) {
            if(lnk != ''){
            linksHtml.push(
              
            <li class="list-group-item graycolor divURL">
                 <div class="check-bot removeURL" style={({float:'left', lineHeight: '0px'})}>  <i onClick={() => this.RemoveThisLinks(lnk)} class="fal fa-trash-alt" />  </div>
            <i >{lnk} </i>
           
               
          
            </li>);
            }
        }.bind(this));
        
        return(
            <React.Fragment>
                 <input placeholder="http://domain.com" style={({marginTop:'0px'})} class="form-control" type="text" value={this.state.newLink} onKeyUp={this.onKeyUP.bind(this)} onChange={this.handleChange.bind(this)} />
               
                <ul class="ulLinksSettings list-group list-group-flush">
                {linksHtml}
                </ul>
               
            </React.Fragment>
        );
    }
}

export default LinksAddForm;