import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SecureRoute from './secure-route.component';
import LoginPage from '../pages/login/login.component';
import Dashboard from '../pages/dashboard/dashboard.component';
import UserList from '../pages/users/user-list.component';
import CompaniesList from '../pages/companies/company-list.component';
import CompanyRegister from '../pages/companies/company-register.component';
import CompanyEdit from '../pages/companies/company-edit.component';
import UserRegister from '../pages/users/user-register.component';
import UserEdit from '../pages/users/user-edit.component';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <SecureRoute
          path='/companies'
          exact
          component={CompaniesList}
          roles={['admin', 'manager']}
        />
        <SecureRoute
          path='/companies/new'
          exact
          component={CompanyRegister}
          roles={['admin']}
        />
        <SecureRoute
          path='/companies/:id'
          exact
          component={CompanyEdit}
          roles={['admin', 'manager']}
        />
        <SecureRoute
          path='/users'
          exact
          component={UserList}
          roles={['admin']}
        />
        <SecureRoute
          path='/users/new'
          exact
          component={UserRegister}
          roles={['admin']}
        />
        <SecureRoute
          path='/users/:id'
          exact
          component={UserEdit}
          roles={['admin']}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
