import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch({
      type: '@currentUser/SIGN_OUT',
    });
  };

  if (!Object.entries(currentUser || {}).length) {
    history.push('/');
  }

  return (
    <>
      <h1>Hello {currentUser.full_name}, you are in Dashboard page!</h1>
      <ul>
        {Object.entries(currentUser).map((arr) => (
          <li>{`${arr[0]}: ${arr[1]}`}</li>
        ))}
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Dashboard;
