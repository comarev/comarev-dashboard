import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import * as S from './signup.styles';
import { useMutationSignup } from 'service/signup';
import { onlyNumbers, parseCellphone } from 'utils/parsers/general';

const schema = yup.object().shape({
  full_name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'As senhas não são iguais. Tente novamente.'
    )
    .required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
});

const SignUp = () => {
  const history = useHistory();

  const { handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      cpf: '',
      cellphone: '',
    },
    mode: 'onChange',
  });

  const { isLoading, mutate } = useMutationSignup();

  function handleFormData(data) {
    const datatoSend = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      address: data.address,
      cpf: onlyNumbers(data.cpf),
      cellphone: parseCellphone(data.cellphone),
    };

    mutate(datatoSend);
  }

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

        <form onSubmit={handleSubmit((data) => handleFormData(data))}>
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
                mask='+55 (999) 99999-9999'
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
                type='password'
                id='password'
              />
            </Grid>
            <Grid item xs={12}>
              <RHFInput
                control={control}
                label='Confirmar senha'
                name='confirmPassword'
                id='confirmPassword'
                type='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            aria-label={isLoading ? 'Carregando...' : 'Cadastrar'}
            disabled={!formState.isValid || isLoading}
          >
            {isLoading ? (
              <CircularProgress
                role='img'
                aria-label='Loading spinner'
                size={25}
              />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <S.Link onClick={() => history.push('/')}>
              Já possui uma conta? Entrar.
            </S.Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
