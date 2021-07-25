import React from 'react';
import CCsLogsTable from '../../Controls/LogsTables/CCLogsTable';

class ccLogs extends React.Component {

    render () {
        return (
        <div>
            <br/>
            <center><h5 class="pageh disable-select">Credit Card Logs</h5></center>
            <br/>
            <CCsLogsTable />
        </div>);
    }
}

export default ccLogs;