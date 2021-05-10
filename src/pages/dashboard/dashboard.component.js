import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/modules/user/actions';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <h1>Hello {user.full_name}, you are in Dashboard page!</h1>
      <ul>
        {Object.entries(user).map((arr) => (
          <li key={user.id}>{`${arr[0]}: ${arr[1]}`}</li>
        ))}
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Dashboard;
