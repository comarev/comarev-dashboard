import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Container } from './styles';

const statusOptions = [
  { value: true, label: 'Ativa' },
  { value: false, label: 'Desativada' },
];

const propsToInput = {
  name: { 'data-testid': 'company-name-input' },
  cnpj: { 'data-testid': 'company-cnpj-input' },
  code: { 'data-testid': 'company-code-input' },
};

const CompanyForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={1}
          alignItems='center'
          direction='row'
          justifycontent='center'
        >
          <Grid item xs={5}>
            <TextField
              {...register('name', { required: true })}
              label='Razão Social'
              variant='outlined'
              margin='normal'
              name='name'
              autoComplete='name'
              required
              autoFocus
              inputProps={propsToInput.name}
              fullWidth
            />
            {errors.name && <span>Este campo deve ser preenchido</span>}
          </Grid>
          <Grid item xs={3}>
            <TextField
              {...register('cnpj', { required: true })}
              label='CNPJ'
              name='cnpj'
              variant='outlined'
              margin='normal'
              autoComplete='cnpj'
              required
              inputProps={propsToInput.cnpj}
              fullWidth
            />
            {errors.cnpj && <span>Este campo deve ser preenchido</span>}
          </Grid>
          <Grid item xs={3}>
            <TextField
              {...register('code', { required: true })}
              label='Código'
              name='code'
              variant='outlined'
              margin='normal'
              autoComplete='code'
              required
              inputProps={propsToInput.code}
              fullWidth
            />
            {errors.code && <span>Este campo deve ser preenchido</span>}
          </Grid>
          <Grid item xs={5}>
            <TextField
              {...register('address')}
              label='Endereço'
              name='address'
              variant='outlined'
              margin='normal'
              autoComplete='address'
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              {...register('phone')}
              label='Phone'
              name='phone'
              variant='outlined'
              margin='normal'
              autoComplete='phone'
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              {...register('discount')}
              label='Desconto (%)'
              name='discount'
              variant='outlined'
              margin='normal'
              autoComplete='discount'
              fullWidth
            />
          </Grid>
          <Grid item xs={4} style={{ marginTop: '15px' }}>
            <TextField
              {...register('active')}
              label='Status'
              select
              variant='outlined'
              value={watch('active', true)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '15px' }}>
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
                'Cadastrar Empresa'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CompanyForm;
