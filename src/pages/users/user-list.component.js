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
import { getUsers } from '../../service/user';
import EditIcon from '@material-ui/icons/Edit';

const UserList = () => {
  const history = useHistory();
  const { data, status } = useQuery('users', getUsers);

  const loading = ['loading', 'iddle'].includes(status);

  if (loading)
    return (
      <Template>
        <Box display='flex' justifyContent='center'>
          <div data-testid='users-loading'>
            <CircularProgress />
          </div>
        </Box>
      </Template>
    );

  return (
    <Template
      title='Usuários'
      rightActions={
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/users/new')}
        >
          Cadastrar Usuário
        </Button>
      }
    >
      <TableContainer>
        <Table aria-label='Companies list'>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>CNPJ</TableCell>
              <TableCell align='left'>Celular</TableCell>
              <TableCell align='left'>Ativo</TableCell>
              <TableCell align='right'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell component='th' scope='row'>
                  {user.full_name}
                </TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                <TableCell align='left'>{user.cpf}</TableCell>
                <TableCell align='left'>{user.cellphone}</TableCell>
                <TableCell align='left'>
                  {user.active ? 'Sim' : 'Não'}
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='edit'
                    color='default'
                    onClick={() => history.push(`/users/${user.id}`)}
                  >
                    <EditIcon />
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

export default UserList;
