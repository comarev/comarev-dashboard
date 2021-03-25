import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "../pages/login/login.component";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/dashboard">
          <h1>Home Page</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
