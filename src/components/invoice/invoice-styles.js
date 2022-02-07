import styled from 'styled-components';

export const Container = styled.div`
  font-size: 1rem;

  border: 1px solid #e8e8e8;
  padding: 1rem;
  min-width: 900px;

  table {
    width: 100%;
    margin-top: 2rem;
    border-collapse: collapse;
  }

  table thead {
    background-color: #e8e8e8;
  }

  table th,
  td {
    padding: 0.7rem;
  }

  table tbody tr {
    border-bottom: 1px solid #e8e8e8;
  }

  table tbody tr:nth-last-child(2) {
    border: 0;
  }
`;

export const Total = styled.td`
  border-top: 1px solid #ccc;
  text-align: right;
  font-weight: bold;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  width: 16rem;
`;

export const DateDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

export const CompanyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  div {
    display: flex;
    flex-direction: column;
  }

  div:last-child {
    text-align: right;
  }
`;

export const Paid = styled.div`
  border-radius: 0.4rem;
  color: #ffffff;
  text-align: center;
  width: 6rem;
  padding: 0.5rem 0;
  align-self: flex-end;
  margin-bottom: 0.5rem;

  ${({ $paid, theme }) =>
    `background-color: ${
      $paid ? theme.palette.success.main : theme.palette.error.main
    }`}
`;
