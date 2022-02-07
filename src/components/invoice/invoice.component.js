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
import { format } from 'date-fns';

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
            Emitida em: {format(new Date(invoice.created_at), 'dd/MM/yyyy')}
          </Typography>
          <Typography component='span'>
            Vence em: {format(new Date(invoice.due_date), 'dd/MM/yyyy')}
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
            <td align='right'>
              {invoice.amount.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
          </tr>
          <tr>
            <td></td>
            <Total>
              Total:{' '}
              {invoice.amount.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Total>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default Invoice;
