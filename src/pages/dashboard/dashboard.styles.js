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
  margin: 1rem;
`;

export const Discount = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #00000099;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  h6 {
    color: white;
  }
`;

export const CompanyCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  cursor: pointer;

  img {
    margin: auto;
    width: 100%;
    border-radius: 1rem;
  }

  ${Discount}:hover {
    opacity: 1;
  }
`;

export const Title = styled(Typography)`
  && {
    font-size: 1rem;
    text-align: center;
  }
`;

export const CompanyInfo = styled(Typography)`
  text-align: center;

  span {
    color: ${({ theme }) => theme.palette.success.dark};
  }
`;

export const CompanyInfoWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  text-align: center;
`;
