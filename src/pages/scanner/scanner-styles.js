import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Reader = styled.div`
  background-color: #000000;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  button {
    margin: auto auto 1rem auto;
    width: 85%;
  }
`;

export const MarkContainer = styled.div`
  margin: auto;
`;

export const BackButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%);
`;

export const LoadingContainer = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SuccessText = styled(Typography)`
  color: #7ac142;
`;

export const ErrorText = styled(Typography)`
  color: #f44336;
`;
