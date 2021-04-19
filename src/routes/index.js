import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/login/login.component';
import Dashboard from '../pages/dashboard/dashboard.component';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <LoginPage />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
