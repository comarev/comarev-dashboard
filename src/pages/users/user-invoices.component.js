import Template from 'components/template/template.component';
import { useParams } from 'react-router-dom';
import useDiscountRequest from 'hooks/use-discount-request';
import {
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { format } from 'date-fns';

const getAllowedCellLabelColor = (allowed) => (allowed ? 'primary' : 'default');

const getAllowedCellLabel = (allowed) => (allowed ? 'Sim' : 'Não');

const formatHour = (hour) => format(new Date(hour), 'k:mm');

const formatDate = (day) => format(new Date(day), 'dd/MM/yy');

const DiscountRequests = () => {
  const params = useParams();
  const companyId = params.id;

  const { invoicesList, isLoading } = useDiscountRequest(companyId);

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='company-edit-spinner' size={25} />;
        </Template>
      );

    return (
      <Template title='Pedidos de desconto'>
        <TableContainer>
          <Table aria-label='List da pedidos de disconto'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Dia</TableCell>
                <TableCell align='left'>Hora</TableCell>
                <TableCell align='left'>Nome</TableCell>
                <TableCell align='left'>Email</TableCell>
                <TableCell align='right'>Liberação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoicesList?.map((invoice) => {
                return (
                  <TableRow key={invoice.id}>
                    <TableCell component='th' scope='row' align='left'>
                      {formatDate(invoice.created_at)}
                    </TableCell>
                    <TableCell component='th' scope='row' align='left'>
                      {formatHour(invoice.created_at)}
                    </TableCell>
                    <TableCell component='th' scope='row' align='left'>
                      {invoice.user.full_name}
                    </TableCell>
                    <TableCell component='th' scope='row' align='left'>
                      {invoice.user.email}
                    </TableCell>
                    <TableCell component='th' scope='row' align='right'>
                      <Chip
                        label={getAllowedCellLabel(invoice.allowed)}
                        color={getAllowedCellLabelColor(invoice.allowed)}
                        size='small'
                        style={{ marginLeft: 10 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Template>
    );
  };

  return render();
};

export default DiscountRequests;
