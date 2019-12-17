import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from 'constants/routes';

// Theme
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from 'config/theme';

// Pages
import HomePage from 'pages/home';
import MessagesPage from 'pages/messages';
import PrivacyPage from 'pages/privacy';
import TermsPage from 'pages/terms';

import JoinPage from 'pages/auth/join';
import SignInPage from 'pages/auth/sign-in';
import ForgotPasswordPage from 'pages/auth/forgot-password';

// Things
import ThingsPage from 'pages/things';
import ThingPage from 'pages/thing';
import NewThingPage from 'pages/things/new';

import ProfilePage from 'pages/user';
import SettingsPage from 'pages/user/settings';

import AdminPage from 'pages/admin';

// Components
import { withAuthentication } from 'components/base/Session';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <div>
        <Navigation />

        <hr />

        {/* Static */}
        <Route path={ROUTES.HOME} component={HomePage} exact />
        <Route
          path={ROUTES.MESSAGES}
          component={MessagesPage}
          exact
        />
        <Route path={ROUTES.PRIVACY} component={PrivacyPage} />
        <Route path={ROUTES.TERMS} component={TermsPage} />

        {/* Auth */}
        <Route path={ROUTES.JOIN} component={JoinPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          component={ForgotPasswordPage}
        />

        {/* Things */}
        <Route path={ROUTES.THINGS} component={ThingsPage} exact />
        <Route
          path={ROUTES.THINGS_NEW}
          component={NewThingPage}
          exact
        />
        <Route path={ROUTES.THING} component={ThingPage} />

        {/* User */}
        <Route path={ROUTES.PROFILE} component={ProfilePage} />
        <Route path={ROUTES.SETTINGS} component={SettingsPage} />

        {/* Admin */}
        <Route path={ROUTES.ADMIN} component={AdminPage} />

        <Footer />
      </div>
    </ThemeProvider>
  </Router>
);

export default withAuthentication(App);
