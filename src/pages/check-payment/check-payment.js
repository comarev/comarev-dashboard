import React, { useEffect, useState } from 'react';
import Template from '../../components/template/template.component';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { getQRCodeRequests } from '../../service/company';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function CheckPayment() {
  const [company, setCompany] = useState();
  const { data, status } = useQuery(
    ['qr-code-checking', company?.id],
    () => getQRCodeRequests(company?.id),
    {
      enabled: !!company?.id,
      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    setCompany({ id: 1 });
  }, []);

  const isLoading = ['loading', 'idle'].includes(status);

  const render = () => {
    if (isLoading)
      return (
        <Box display='flex' justifyContent='center'>
          <div data-testid='qrcodes-invoices-loading'>
            <CircularProgress />
          </div>
        </Box>
      );

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Situação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((request) => (
            <TableRow>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.user.full_name}</TableCell>
              <TableCell>
                {format(new Date(request.created_at), 'Pp', { locale: ptBR })}
              </TableCell>
              <TableCell>{request.allowed ? 'OK' : 'Irregular'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return <Template title='Conferir pagamento'>{render()}</Template>;
}

export default CheckPayment;
