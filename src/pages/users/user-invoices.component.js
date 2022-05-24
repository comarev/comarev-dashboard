import Template from 'components/template/template.component';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDiscountRequest from 'hooks/use-discount-request';
import useCompanies from 'hooks/use-companies';
import useCompaniesSelectionMenuItem from 'hooks/use-companies-selection-menu-item';
import {
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { format } from 'date-fns';

const getAllowedCellLabelColor = (allowed) => (allowed ? 'primary' : 'default');

const getAllowedCellLabel = (allowed) => (allowed ? 'Sim' : 'Não');

const formatHour = (hour) => format(new Date(hour), 'k:mm');

const formatDate = (day) => format(new Date(day), 'dd/MM/yy');

const DiscountRequests = () => {
  const { companies, isLoading: isLoadingCompanies } = useCompanies();

  const { selectedCompany, setSelectedCompany } =
    useCompaniesSelectionMenuItem(companies);

  const { invoicesList, isLoading: isLoadingDiscountRequest } =
    useDiscountRequest(selectedCompany);

  const handleChangeCompany = (event) => {
    setSelectedCompany(event.target.value);
  };

  const renderTable = () => {
    if (isLoadingDiscountRequest)
      return <CircularProgress testid='company-edit-spinner' size={25} />;

    return (
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
    );
  };

  const render = () => {
    if (isLoadingCompanies)
      return (
        <Template>
          <CircularProgress testid='company-edit-spinner' size={25} />
        </Template>
      );

    return (
      <Template title='Pedidos de desconto'>
        <TextField
          label='Empresa'
          select
          onChange={handleChangeCompany}
          value={selectedCompany}
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>
        {renderTable()}
      </Template>
    );
  };

  return render();
};

export default DiscountRequests;
