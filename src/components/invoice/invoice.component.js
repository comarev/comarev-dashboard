import React from 'react';

import {
  Container,
  Header,
  DateDetails,
  Logo,
  CompanyDetails,
  Total,
  Paid,
} from './invoice-styles';
import LogoComarev from '../../assets/images/logo-comarev.png';
import { Typography } from '@material-ui/core';

function Invoice({ invoice }) {
  return (
    <Container>
      <Header>
        <div>
          <Logo src={LogoComarev} />
        </div>
        <DateDetails>
          <Paid $paid={invoice.paid}>
            {invoice.paid ? 'Pago' : 'Em aberto'}
          </Paid>
          <Typography component='span'>Fatura #{invoice.id}</Typography>
          <Typography component='span'>
            Emitida em: {invoice.created_at}
          </Typography>
          <Typography component='span'>
            Vence em: {invoice.updated_at}
          </Typography>
        </DateDetails>
      </Header>
      <CompanyDetails>
        <div>
          <Typography component='span'>
            R. Dr. Brasílio Rodrigues dos Santos, 454
          </Typography>
          <Typography component='span'>
            Chacara Dr. Luis Candido Alves Bancarios
          </Typography>
          <Typography component='span'>Batatais - SP, 14305-000</Typography>
        </div>
        <div>
          <Typography component='span'>
            Associação Comunidade Auxiliadora Recuperando Vidas
          </Typography>
          <Typography component='span'>(16) 3761-4581</Typography>
        </div>
      </CompanyDetails>
      <table>
        <thead>
          <tr>
            <th align='left'>Itens</th>
            <th align='right'>Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contribuição COMAREV</td>
            <td align='right'>{invoice.amount}</td>
          </tr>
          <tr>
            <td></td>
            <Total>Total: {invoice.amount}</Total>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default Invoice;
