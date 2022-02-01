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

export default function CompaniesListing({ data }) {
  const history = useHistory();

  return (
    <TableContainer>
      <Table aria-label='Companies list'>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align='right'>Telefone</TableCell>
            <TableCell align='right'>Desconto&nbsp;</TableCell>
            <TableCell align='right'>CNPJ</TableCell>
            <TableCell align='right'>Ativo</TableCell>
            <TableCell align='right'>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company) => (
            <TableRow key={company.name}>
              <TableCell component='th' scope='row'>
                {company.name}
              </TableCell>
              <TableCell align='right'>{company.phone}</TableCell>
              <TableCell align='right'>{company.discount}</TableCell>
              <TableCell align='right'>{company.cnpj}</TableCell>
              <TableCell align='right'>
                {company.active ? 'Sim' : 'Não'}
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='edit'
                  color='primary'
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
