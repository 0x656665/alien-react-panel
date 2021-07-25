import React from 'react';
import BanksLogsTable from '../../Controls/LogsTables/BanksLogsTable';

class bankLogs extends React.Component {

    render () {
        return (
        <div>
            <br/>
            <center><h5 class="pageh disable-select">Bank Logs</h5></center>
            <br/>
            <BanksLogsTable />
        </div>);
    }
}

export default bankLogs;