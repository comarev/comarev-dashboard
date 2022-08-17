import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Container = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`

export const CircularLoading = () => {
  return (  
    <Container> 
      <CircularProgress />
    </Container>
  )
}
