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
  justify-content: center;
`;

export const CompanyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 150px;
  overflow: hidden;
  transition: 0.2s;
  cursor: pointer;

  img {
    margin: auto;
    width: 100%;
    border-radius: 1rem;
  }
`;

export const Title = styled(Typography)`
  && {
    font-size: 1rem;
    text-align: center;
  }
`;

export const Discount = styled(Typography)`
  color: ${({ theme }) => theme.palette.success.dark};
`;

export const CompanyCardWithouImage = styled.div`
  display: flex;
  gap: 0.2rem;
`;
