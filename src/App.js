import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import config from './config/config';
import {StripeProvider} from 'react-stripe-elements';
import {ParallaxProvider} from 'react-scroll-parallax'
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import AboutPage from './components/AboutPage/AboutPage';
import DonatePage from './components/DonatePage/DonatePage';
import ApplicationPage from './components/Application/ApplicationPage';
import AdminPage from './components/Admin/Admin';
import './styles/main.css';
import PSFTheme from './components/PSFTheme/PSFTheme';
import { MuiThemeProvider } from '../node_modules/@material-ui/core';

const App = () => (
  <div>
    <MuiThemeProvider theme={PSFTheme}>
      {/* <Header title="Project Base" /> */}
      <StripeProvider apiKey={config.STRIPE_PUBLISHABLE}>
        <ParallaxProvider>
          <Router>
            <Switch>

              <Redirect exact from="/" to="/home" />
              <Route
                path="/home"
                component={HomePage}
              />
              <Route
                path="/about"
                component={AboutPage}
              />
              <Route
                path="/donate"
                component={DonatePage}
              />
              <Route
                path="/login"
                component={LoginPage}
              />
              <Route
                path="/register"
                component={RegisterPage}
              />
              <Route
                path="/user"
                component={UserPage}
              />
              <Route
                path="/application"
                component={ApplicationPage}
              />
              <Route
                path="/admin"
                component={AdminPage}
              />
              {/* OTHERWISE (no path!) */}
              <Route render={() => <h1>404</h1>} />

            </Switch>
          </Router>
        </ParallaxProvider>
      </StripeProvider>
    </MuiThemeProvider>
  </div>
);

export default App;
