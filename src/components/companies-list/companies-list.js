import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { formatCpfCnpj } from 'utils/formatters/general';

export default function CompaniesListing({ data }) {
  const history = useHistory();

  return (
    <TableContainer>
      <Table aria-label='Companies list'>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align='left'>Telefone</TableCell>
            <TableCell align='left'>Desconto&nbsp;</TableCell>
            <TableCell align='left'>CNPJ</TableCell>
            <TableCell align='left'>Ativo</TableCell>
            <TableCell align='right'>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company) => (
            <TableRow key={company.name}>
              <TableCell component='th' scope='row'>
                {company.name}
              </TableCell>
              <TableCell align='left'>{company.phone}</TableCell>
              <TableCell align='left'>{company.discount}%</TableCell>
              <TableCell align='left'>{formatCpfCnpj(company.cnpj)}</TableCell>
              <TableCell align='left'>
                {company.active ? 'Sim' : 'Não'}
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='edit'
                  color='default'
                  onClick={() => history.push(`/companies/${company.id}`)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
