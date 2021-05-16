import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      // spreading
      {...rest}
      render={(props) =>
        user.logged ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export default SecureRoute;
