import React from 'react';
import MailsLogsTable from '../../Controls/LogsTables/MailLogsTable';

class mailLogs extends React.Component {

    render () {
        return (
        <div>
            <br/>
            <center><h5 class="pageh disable-select">Email Logs</h5></center>
            <br/>
            <MailsLogsTable />
        </div>);
    }
}

export default mailLogs;