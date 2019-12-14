import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from 'components/Navigation';

import HomePage from 'pages/home';
import PrivacyPage from 'pages/privacy';
import TermsPage from 'pages/terms';

import JoinPage from 'pages/auth/join';
import SignInPage from 'pages/auth/sign-in';
import ForgotPasswordPage from 'pages/auth/forgot-password';

import GuidePage from 'pages/guide';

import ProfilePage from 'pages/user';
import SettingsPage from 'pages/user/settings';

import AdminPage from 'pages/admin';

import * as ROUTES from 'constants/routes';
import { withAuthentication } from 'components/base/Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      {/* Static */}
      <Route path={ROUTES.HOME} component={HomePage} exact />
      <Route path={ROUTES.PRIVACY} component={PrivacyPage} />
      <Route path={ROUTES.TERMS} component={TermsPage} />

      {/* Auth */}
      <Route path={ROUTES.JOIN} component={JoinPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        component={ForgotPasswordPage}
      />

      {/* Guide */}
      <Route path={ROUTES.GUIDE} component={GuidePage} />

      {/* User */}
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.SETTINGS} component={SettingsPage} />

      {/* Admin */}
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
