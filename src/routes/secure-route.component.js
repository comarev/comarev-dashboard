import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_ROLES } from '../utils/constants';

const SecureRoute = ({ component: Component, roles = [], ...rest }) => {
  const user = useSelector((state) => state.user);
  const userRoles = USER_ROLES.filter((role) => user[role]);

  const hasPermission =
    roles.length === 0 || roles.some((role) => userRoles.includes(role));

  useEffect(() => {
    if (!hasPermission) toast.error('Permissões insuficientes!');
  }, [hasPermission]);

  return (
    <Route
      // spreading
      {...rest}
      render={(props) => {
        if (!user.logged)
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );

        if (!hasPermission) return <Redirect to='/dashboard' />;

        return <Component {...props} />;
      }}
    />
  );
};

export default SecureRoute;
