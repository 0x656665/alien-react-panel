import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router'

/* Импорт классов всех страниц */
import HomePage from '../pages/HomePage';
import BotsList from '../pages/BotsList';
import SettingsPage from '../pages/SettingsPage';
import bankLogs from '../pages/Logs/bankLogs';
import ccLogs from '../pages/Logs/ccLogs';

import mailLogs from '../pages/Logs/mailLogs';
import AddInject from '../pages/addInj';
import files from '../pages/files';
import dbSMS from '../pages/dbSMS';
import builder from '../pages/builder';
import session from '../pages/session';
import socks5 from '../pages/socks5';

const ContentManager = () => (
    <div id="content">
    <Switch>{/* Роутер для переключения страниц */}
    <Route exact path="/" render={() =>(<Redirect to="/clients"/>)}/>
        <Route exact path='/tutorial' component={HomePage} />
        <Route exact path='/clients' component={BotsList}/>
        <Route exact path='/list_banks' component={bankLogs}/>
        <Route exact path='/list_credit_cards' component={ccLogs}/>
        <Route exact path='/list_emails' component={mailLogs}/>
        <Route exact path='/injects' component={AddInject}/>
        <Route exact path='/settings' component={SettingsPage}/>
        <Route exact path='/builder' component={builder}/>
        <Route exact path='/files' component={files}/>
        <Route exact path='/db_mails' component={dbSMS}/>
        <Route exact path='/socks5' component={socks5}/>
        <Route exact path='/session' component={session}/>
    </Switch>
    </div>
);

export default ContentManager;