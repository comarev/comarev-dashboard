import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { USER_SIGN_OUT } from '../../store/modules/user/actions';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch({
      type: USER_SIGN_OUT,
    });
  };

  if (!Object.entries(user || {}).length) {
    history.push('/');
  }

  return (
    <>
      <h1>Hello {user.full_name}, you are in Dashboard page!</h1>
      <ul>
        {Object.entries(user).map((arr) => (
          <li>{`${arr[0]}: ${arr[1]}`}</li>
        ))}
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Dashboard;
