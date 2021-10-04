import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Persistor = ({ children }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const [loading, setLoading] = useState(() => {
    const hasDataStoraged = Boolean(user);

    return hasDataStoraged;
  });

  useEffect(() => {
    if (Boolean(user)) {
      dispatch({
        type: 'persist/REHYDRATE',
        payload: {
          user: JSON.parse(user),
        },
      });

      setLoading(false);
    }
  }, [dispatch, user]);

  return loading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    children
  );
};

export default Persistor;
