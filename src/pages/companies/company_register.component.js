import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Template from '../../components/template/template.component';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { registerCompany } from '../../service/company';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const statusOptions = [
  { value: true, label: 'Ativa' },
  { value: false, label: 'Desativada' },
];

const ComapanyRegister = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onStart = () => setLoading(true);
  const onError = (errors) => errors.forEach((error) => toast.error(error));
  const onCompleted = () => setLoading(false);

  const onSuccess = () => {
    history.push('/companies');
    toast.success('Empresa cadastrada com sucesso!');
  };

  const onSubmit = (payload) => {
    registerCompany({ payload, onStart, onSuccess, onError, onCompleted });
  };

  return (
    <Template>
      <h1>Cadastrar empresa</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', { required: true })}
          label='Razão Social'
          variant='outlined'
          margin='normal'
          required
          name='name'
          autoFocus
        />
        {errors.name && <span>Este campo deve ser preenchido</span>}
        <TextField
          {...register('cnpj', { required: true })}
          label='CNPJ'
          name='cnpj'
          variant='outlined'
          margin='normal'
          required
        />
        {errors.cnpj && <span>Este campo deve ser preenchido</span>}
        <TextField
          {...register('code', { required: true })}
          label='Código'
          name='code'
          variant='outlined'
          margin='normal'
          required
        />
        {errors.code && <span>Este campo deve ser preenchido</span>}
        <TextField
          {...register('address')}
          label='Endereço'
          name='address'
          variant='outlined'
          margin='normal'
        />
        <TextField
          {...register('phone')}
          label='Phone'
          name='phone'
          variant='outlined'
          margin='normal'
        />
        <TextField
          {...register('discount')}
          label='Desconto'
          name='discount'
          variant='outlined'
          margin='normal'
        />
        <TextField
          {...register('status')}
          label='Status'
          select
          variant='outlined'
          value={watch('status', true)}
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
    </Template>
  );
};

export default ComapanyRegister;
