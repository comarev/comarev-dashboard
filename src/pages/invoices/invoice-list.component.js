import React from 'react';
import Template from '../../components/template/template.component';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { getInvoices } from '../../service/invoice';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import RoleFilter from '../../components/role-filter/role-filter.component';
import { format } from 'date-fns';

const InvoiceList = () => {
  const history = useHistory();
  const { data, status } = useQuery('invoices', getInvoices);

  const loading = ['loading', 'iddle'].includes(status);

  if (loading)
    return (
      <Template>
        <Box display='flex' justifyContent='center'>
          <div data-testid='invoices-loading'>
            <CircularProgress />
          </div>
        </Box>
      </Template>
    );

  return (
    <Template
      title='Faturas'
      rightActions={
        <RoleFilter>
          <Button
            variant='contained'
            color='primary'
            onClick={() => history.push('/invoices/new')}
          >
            Gerar fatura
          </Button>
        </RoleFilter>
      }
    >
      <TableContainer>
        <Table aria-label='Invoices list'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align='left'>Valor</TableCell>
              <TableCell align='left'>Paga</TableCell>
              <TableCell align='left'>Criada em</TableCell>
              <TableCell align='left'>Atualizada em</TableCell>
              <TableCell align='right'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell align='left'>{invoice.id}</TableCell>
                <TableCell component='th' scope='row'>
                  {invoice?.user?.full_name}
                </TableCell>
                <TableCell align='left'>
                  {invoice.amount.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell align='left'>
                  {invoice.paid ? 'Sim' : 'Não'}
                </TableCell>
                <TableCell align='left'>
                  {format(new Date(invoice.created_at), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell align='left'>
                  {format(new Date(invoice.updated_at), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell align='right'>
                  <RoleFilter>
                    <IconButton
                      aria-label='edit'
                      color='default'
                      onClick={() => history.push(`/invoices/${invoice.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </RoleFilter>
                  <IconButton
                    aria-label='view'
                    color='default'
                    onClick={() => history.push(`/invoices/show/${invoice.id}`)}
                  >
                    <ViewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Template>
  );
};

export default InvoiceList;
