import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ShowCase = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;
`;

export const CompanyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 120px;
  overflow: hidden;
  transition: 0.2s;
  border-radius: 1rem;
  -webkit-filter: grayscale(100%);
  cursor: pointer;

  img {
    margin: auto;
    width: 100%;
  }

  &:hover {
    -webkit-filter: grayscale(0%);
  }
`;

export const Title = styled(Typography)`
  && {
    font-size: 1rem;
    text-align: center;
  }
`;
