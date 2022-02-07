import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RHFInput from '../../../components/rhf-input/rhf-input.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, Box, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getUsers } from '../../../service/user';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

const paidOptions = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' },
];

const schema = yup.object().shape({
  user_id: yup.string().required('Campo obrigatório'),
  amount: yup.string().required('Campo obrigatório'),
  paid: yup.string().required('Campo obrigatório'),
});

const filterCustomers = (users) =>
  users?.filter((user) => user.companies.length === 0);

const InvoiceForm = ({ onSubmit, loading, invoice }) => {
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: invoice,
  });
  const user = useSelector((state) => state.user);
  const { data } = useQuery('users', getUsers, { enabled: user.admin });

  const editing = !!invoice;
  const buttonValue = editing ? 'Atualizar Fatura' : 'Cadastrar Fatura';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        alignItems='center'
        direction='row'
        justifycontent='center'
      >
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            disabled={!user.admin}
            id='invoice-user'
            options={filterCustomers(data?.data) || []}
            getOptionLabel={(option) => option.full_name}
            getOptionSelected={(option, value) => option.id === value.id}
            defaultValue={invoice?.user}
            filterSelectedOptions
            onChange={(e, value) => setValue('user_id', value.id)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Cliente'
                placeholder='Selecione o cliente'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RHFInput
            name='amount'
            label='Valor'
            control={control}
            currencyInput
          />
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <RHFInput
            name='paid'
            label='Pago'
            select
            control={control}
            defaultValue={false}
          >
            {paidOptions.map((option) => (
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
              aria-label='Enviar Fatura'
            >
              {loading ? (
                <CircularProgress testid='invoice-register-spinner' size={25} />
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

export default InvoiceForm;
