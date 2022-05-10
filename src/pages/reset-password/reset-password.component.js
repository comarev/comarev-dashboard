import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from 'yup';
import * as S from './reset-password.styles';

import { useMutationNewPassword } from 'service/password';

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setError] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');

  const { isLoading, mutate } = useMutationNewPassword();

  const schema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError(true);
      return;
    }

    const payload = { password, confirmPassword, token };

    mutate(payload);
  };

  useEffect(() => {
    if (password.trim() && confirmPassword.trim()) {
      schema.isValid({ password, confirmPassword }).then((valid) => {
        if (valid) {
          setError(false);
          setResetPasswordError('');
        } else {
          setError(true);
          setResetPasswordError('Senhas não coincidem');
        }
      });
    }
  }, [password, confirmPassword, schema]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <S.Paper>
        <S.AvatarWrapper>
          <LockOutlinedIcon />
        </S.AvatarWrapper>
        <Typography component='h1' variant='h5'>
          Redefinir senha
        </Typography>
        <S.Form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Senha'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={formError}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirm-password'
            label='Confirmar senha'
            type='password'
            id='confirm-password'
            autoComplete='current-password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={formError}
          />
          {Boolean(resetPasswordError) && (
            <Typography color='error'>{resetPasswordError}</Typography>
          )}
          <S.SubmitButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            disabled={isLoading}
            aria-label='redefinir senha'
          >
            {isLoading ? (
              <CircularProgress data-testid='login-spinner' size={25} />
            ) : (
              'Redefinir'
            )}
          </S.SubmitButton>
        </S.Form>
      </S.Paper>
    </Container>
  );
};

export default ResetPassword;
