import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFInput from 'components/rhf-input/rhf-input.component';

const schema = yup.object().shape({
  full_name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
});

const SignUp = () => {
  const history = useHistory();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      address: '',
      cpf: '',
      cellphone: '',
    },
    mode: 'onBlur',
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Cadastre-se
        </Typography>

        <form onSubmit={handleSubmit(async (data) => ({}))}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <RHFInput
                control={control}
                label='Nome completo'
                name='full_name'
                id='full_name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFInput
                control={control}
                label='E-mail'
                name='email'
                id='email'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFInput
                control={control}
                label='CPF'
                mask='999.999.999-99'
                name='cpf'
                id='cpf'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFInput
                control={control}
                label='Telefone'
                mask='(99) 99999-9999'
                name='cellphone'
                id='cellphone'
              />
            </Grid>
            <Grid item xs={12}>
              <RHFInput
                control={control}
                label='Endereço'
                name='address'
                id='address'
              />
            </Grid>
            <Grid item xs={12}>
              <RHFInput
                control={control}
                label='Senha'
                name='password'
                id='password'
                type='password'
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox control={control} value='allowExtraEmails' color='primary' />}
                label='Concordo com os termos, políticas de dados e cookies.'
              />
            </Grid> */}
          </Grid>
        </form>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Box variant='body2' onClick={() => history.push('/')}>
              Já possui uma conta? Entrar.
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
