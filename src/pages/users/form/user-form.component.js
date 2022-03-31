import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RHFInput from 'components/rhf-input/rhf-input.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const statusOptions = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Desativado' },
];

const adminOptions = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' },
];

const schema = yup.object().shape({
  full_name: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
  active: yup.string().required('Campo obrigatório'),
  admin: yup.string().required('Campo obrigatório'),
});

const UserForm = ({ onSubmit, loading, user }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const editing = !!user;
  const buttonValue = editing ? 'Atualizar Usuário' : 'Cadastrar Usuário';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        alignItems='center'
        direction='row'
        justifycontent='center'
      >
        <Grid item xs={12} md={6}>
          <RHFInput
            name='full_name'
            label='Nome completo'
            autoFocus
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <RHFInput
            name='cellphone'
            label='Celular'
            mask='+55 (999) 99999-9999'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <RHFInput
            name='cpf'
            label='CPF'
            mask='999.999.999-99'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <RHFInput name='address' label='Endereço' control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RHFInput name='email' label='Email' control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <RHFInput
            name='password'
            label='Senha'
            type='password'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <RHFInput
            name='active'
            label='Status'
            select
            control={control}
            defaultValue={true}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFInput>
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <RHFInput
            name='admin'
            label='Super Admin'
            select
            control={control}
            defaultValue={false}
          >
            {adminOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFInput>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
              aria-label='Cadastrar Usuário'
            >
              {loading ? (
                <CircularProgress testid='user-register-spinner' size={25} />
              ) : (
                buttonValue
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
