import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

const Dashboard = ({ currentUser, dispatch }) => {
  const history = useHistory();

  const handleSignOut = () => {
    dispatch({ type: '@currentUser/SIGN_OUT' });

    history.push('/');
  };

  if (!Object.entries(currentUser || {}).length) {
    return (
      <>
        <h1>Hello from Dashboard, you are not logged in...</h1>
        <Link to='/'>
          <button type='button'>Login</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Hello {currentUser.full_name}, you are in Dashboard page!</h1>
      <ul>
        {Object.entries(currentUser).map((arr) => (
          <li>{`${arr[0]}: ${arr[1]}`}</li>
        ))}
      </ul>
      <button type='button' onClick={handleSignOut}>
        Logout
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps)(Dashboard);
