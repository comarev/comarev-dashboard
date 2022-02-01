import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SecureRoute from './secure-route.component';
import LoginPage from '../pages/login/login.component';
import Dashboard from '../pages/dashboard/dashboard.component';
import UserList from '../pages/users/user-list.component';
import CompaniesList from '../pages/companies/company-list.component';
import CompanyRegister from '../pages/companies/company-register.component';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <SecureRoute path='/users' component={UserList} admin />
        <SecureRoute path='/companies' exact component={CompaniesList} admin />
        <SecureRoute
          path='/companies/new'
          exact
          component={CompanyRegister}
          admin
        />
      </Switch>
    </Router>
  );
};

export default Routes;
