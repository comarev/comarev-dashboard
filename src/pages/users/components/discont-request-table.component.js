import { getHourFormated, getDateFormated } from 'utils/formatters/general';
import {
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@material-ui/core';

const getAllowedCellLabelColor = (allowed) => (allowed ? 'primary' : 'default');

const getAllowedCellLabel = (allowed) => (allowed ? 'Sim' : 'Não');

const DiscountRequestTable = ({ invoicesList }) => {
  return (
    <TableContainer>
      <Table aria-label='List da pedidos de disconto'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Dia</TableCell>
            <TableCell align='left'>Hora</TableCell>
            <TableCell align='left'>Nome</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='right'>Aprovação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoicesList?.map((invoice) => {
            return (
              <TableRow key={invoice.id}>
                <TableCell component='th' scope='row' align='left'>
                  {getDateFormated(invoice.created_at)}
                </TableCell>
                <TableCell component='th' scope='row' align='left'>
                  {getHourFormated(invoice.created_at)}
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
  );
};

export default DiscountRequestTable;
