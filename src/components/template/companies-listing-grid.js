import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

export default function CompaniesListing({ data }) {
  const classes = useStyles();
  return (
    <>
    <h2>Empresas</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align='right'>Telefone</TableCell>
              <TableCell align='right'>Desconto&nbsp;</TableCell>
              <TableCell align='right'>CNPJ</TableCell>
              <TableCell align='right'>Ativo</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
