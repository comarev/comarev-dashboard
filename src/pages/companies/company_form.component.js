import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      />
      {errors.name && <span>Este campo deve ser preenchido</span>}
      <TextField
        {...register('cnpj', { required: true })}
        label='CNPJ'
        name='cnpj'
        variant='outlined'
        margin='normal'
        autoComplete='cnpj'
        required
        inputProps={propsToInput.cnpj}
      />
      {errors.cnpj && <span>Este campo deve ser preenchido</span>}
      <TextField
        {...register('code', { required: true })}
        label='Código'
        name='code'
        variant='outlined'
        margin='normal'
        autoComplete='code'
        required
        inputProps={propsToInput.code}
      />
      {errors.code && <span>Este campo deve ser preenchido</span>}
      <TextField
        {...register('address')}
        label='Endereço'
        name='address'
        variant='outlined'
        margin='normal'
        autoComplete='address'
      />
      <TextField
        {...register('phone')}
        label='Phone'
        name='phone'
        variant='outlined'
        margin='normal'
        autoComplete='phone'
      />
      <TextField
        {...register('discount')}
        label='Desconto'
        name='discount'
        variant='outlined'
        margin='normal'
        autoComplete='discount'
      />
      <TextField
        {...register('status')}
        label='Status'
        select
        variant='outlined'
        value={watch('status', true)}
        autoComplete='status'
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        disabled={loading}
        aria-label='Cadastrar Empresa'
      >
        {loading ? (
          <CircularProgress testid='company-register-spinner' size={25} />
        ) : (
          'Cadastrar Empresa'
        )}
      </Button>
    </form>
  );
};

export default CompanyForm;
