import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from 'react-service-worker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import 'semantic-ui-less/semantic.less';

import HomePage from './pages/home';
import LayoutPage from './pages/layout';
import PagesPage from './pages/pages';
import VariablesPage from './pages/variables';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import NotFoundPage from './pages/404';

import UIComponent from './components/ui';

/*

TODO:
  - mobile: sidebar onhide close
  - non transparent pwa icon
  - rearrange on mobile and sidebar
  - offline popup
  - reconnect subs
  - send value slider onchange
  - hue bar

*/

const pages = {
  "/": HomePage,
  "/layout": LayoutPage,
  "/pages": PagesPage,
  "/variables": VariablesPage,
  "/settings": SettingsPage,
  "/about": AboutPage,
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {Object.entries(pages).map(i =>
          <Route path={i[0]} exact key={i[0]}>
            <UIComponent>
              {React.createElement(i[1])}
            </UIComponent>
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
