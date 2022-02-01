import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RHFInput from '../../../components/rhf-input/rhf-input.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const statusOptions = [
  { value: true, label: 'Ativa' },
  { value: false, label: 'Desativada' },
];

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().required('Campo obrigatório'),
  code: yup.string().required('Campo obrigatório'),
  address: yup.string(),
  phone: yup.string(),
  discount: yup.string(),
  active: yup.string().required('Campo obrigatório'),
});

const CompanyForm = ({ onSubmit, loading, company }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: company,
  });

  const editing = !!company;
  const buttonValue = editing ? 'Atualizar empresa' : 'Cadastrar empresa';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        alignItems='center'
        direction='row'
        justifycontent='center'
      >
        <Grid item xs={12} md={5}>
          <RHFInput
            name='name'
            label='Razão Social'
            autoFocus
            dataTestId='company-name-input'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFInput
            name='cnpj'
            label='CNPJ'
            dataTestId='company-cnpj-input'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFInput
            name='code'
            label='Código'
            dataTestId='company-code-input'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <RHFInput name='address' label='Endereço' control={control} />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFInput name='phone' label='Telefone' control={control} />
        </Grid>
        <Grid item xs={12} md={2}>
          <RHFInput name='discount' label='Desconto (%)' control={control} />
        </Grid>
        <Grid item xs={12} md={2}>
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
