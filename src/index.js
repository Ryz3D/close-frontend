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
  - homekit always expects number and sets aggressively (STOP not accepted)
    -> different windowcovering characteristic?
    -> ignore homekit requests?
    -> id marked subs?
  - non transparent pwa icon
  - offline popup
  - closerest: buffer var values and send on cb register
  - variable page sub
  - optionally disable transitions

*/

const pages = [
  ['home', 'Home', HomePage],
  ['homeSet', 'Set Homepage', HomeSetPage],
  ['view', 'Layout', ViewPage],
  ['layouts', 'Layouts', LayoutsPage],
  ['variables', 'Variables', VariablesPage],
  ['settings', 'Settings', SettingsPage],
  ['about', 'About', AboutPage],
];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact><IndexPage /></Route>
        {pages.map(p =>
          <Route path={`/${p[0]}`}>
            <UIComponent header={p[1]} component={p[2]} />
          </Route>
        )}
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
