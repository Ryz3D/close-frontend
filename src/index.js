import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from 'react-service-worker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import './index.css';
import 'semantic-ui-less/semantic.less';

import IndexPage from './pages/index';
import HomePage from './pages/home';
import HomeSetPage from './pages/homeSet';
import ViewPage from './pages/view';
import LayoutsPage from './pages/layouts';
import VariablesPage from './pages/variables';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import NotFoundPage from './pages/404';

import UIComponent from './components/ui';

/*

TODO:
  - more settings
  - dark mode based on var (e.g. light brightness)
  - homekit always expects number and sets aggressively (STOP not accepted)
    -> different windowcovering characteristic?
    -> ignore homekit requests?
    -> id marked subs?
  - non transparent pwa icon
  - offline popup
  - reconnect sub
  - closerest: buffer var values and send on cb register
  - variable page sub

*/

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact><IndexPage /></Route>
        <Route path="/home"><UIComponent header="Home"><HomePage /></UIComponent></Route>
        <Route path="/homeSet"><UIComponent header="Set Homepage"><HomeSetPage /></UIComponent></Route>
        <Route path="/view"><UIComponent header="Layout"><ViewPage /></UIComponent></Route>
        <Route path="/layouts"><UIComponent header="Layouts"><LayoutsPage /></UIComponent></Route>
        <Route path="/variables"><UIComponent header="Variables"><VariablesPage /></UIComponent></Route>
        <Route path="/settings"><UIComponent header="Settings"><SettingsPage /></UIComponent></Route>
        <Route path="/about"><UIComponent header="About"><AboutPage /></UIComponent></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerServiceWorker();
