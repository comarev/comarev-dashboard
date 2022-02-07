import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RHFInput from '../../../components/rhf-input/rhf-input.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getUsers } from '../../../service/user';
import { useSelector } from 'react-redux';

const statusOptions = [
  { value: true, label: 'Ativa' },
  { value: false, label: 'Desativada' },
];

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().required('Campo obrigatório'),
  address: yup.string(),
  phone: yup.string(),
  discount: yup.string(),
  active: yup.string().required('Campo obrigatório'),
});

const CompanyForm = ({ onSubmit, loading, company }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...company,
      managers: company?.managers,
      regulars: company?.regulars,
    },
  });
  const user = useSelector((state) => state.user);

  const editing = !!company;
  const buttonValue = editing ? 'Atualizar Empresa' : 'Cadastrar Empresa';

  const { data } = useQuery('users', getUsers, { enabled: user.admin });

  const managerIds = watch('managers')?.map((manager) => manager.id) || [];
  const employeeIds = watch('regulars')?.map((employee) => employee.id) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        alignItems='center'
        direction='row'
        justifycontent='center'
      >
        <Grid item xs={12} md={6} lg={5}>
          <RHFInput
            name='name'
            label='Razão Social'
            autoFocus
            dataTestId='company-name-input'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RHFInput
            name='cnpj'
            label='CNPJ'
            dataTestId='company-cnpj-input'
            control={control}
            mask='99.999.999/9999-99'
          />
        </Grid>
        {editing && (
          <Grid item xs={12} md={6} lg={3}>
            <RHFInput
              name='code'
              label='Código'
              dataTestId='company-code-input'
              control={control}
              disabled
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <RHFInput name='address' label='Endereço' control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFInput
            name='phone'
            label='Telefone'
            control={control}
            mask='(99) 9999-9999'
          />
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <RHFInput
            name='discount'
            label='Desconto (%)'
            type='number'
            control={control}
            inputProps={{ min: 0, max: 100 }}
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
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disabled={!user.admin}
            multiple
            id='company-managers'
            options={data?.data || []}
            getOptionLabel={(option) => option.full_name}
            getOptionSelected={(option, value) => option.id === value.id}
            defaultValue={company?.managers}
            filterSelectedOptions
            onChange={(e, values) => setValue('managers', values)}
            getOptionDisabled={(option) => employeeIds.includes(option.id)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Gerentes'
                placeholder='Selecione os gerentes da empresa'
                margin='normal'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disabled={!user.admin}
            multiple
            id='company-employees'
            options={data?.data || []}
            getOptionLabel={(option) => option.full_name}
            getOptionSelected={(option, value) => option.id === value.id}
            defaultValue={company?.regulars}
            filterSelectedOptions
            onChange={(e, values) => setValue('regulars', values)}
            getOptionDisabled={(option) => managerIds.includes(option.id)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Funcionários'
                placeholder='Selecione os funcionários da empresa'
                margin='normal'
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
              aria-label='Cadastrar Empresa'
            >
              {loading ? (
                <CircularProgress testid='company-register-spinner' size={25} />
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

export default CompanyForm;
