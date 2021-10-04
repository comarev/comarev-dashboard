import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const SecureRoute = ({ component: Component, admin, ...rest }) => {
  const user = useSelector((state) => state.user);
  const forbidden = admin && !user.admin;

  useEffect(() => {
    if (forbidden) toast.error('Permissões insuficientes!');
  }, [forbidden]);

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

        if (forbidden) return <Redirect to='/dashboard' />;

        return <Component {...props} />;
      }}
    />
  );
};

export default SecureRoute;
