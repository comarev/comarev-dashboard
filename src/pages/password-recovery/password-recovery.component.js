import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import * as S from './password-recovery.styles';
import * as yup from 'yup';

import { passwordRecovery } from 'service/password';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [formError, setError] = useState(false);
  const [recoverPasswordError, setRecoverPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onStart = () => setLoading(true);
  const onEnd = () => setLoading(false);
  const onSuccess = (data) => {
    toast.success('E-mail de recuperação enviado com sucesso!');
  };

  const schema = yup.object().shape({
    email: yup.string().email('e-mail inválido').required(),
  });

  const onError = (message) => {
    toast.error(
      'Não foi possível enviar o e-mail de recuperação, por favor tente novamente mais tarde!'
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError(true);
      return;
    }

    const payload = { email };

    await passwordRecovery(payload, onSuccess, onError, onEnd, onStart);
  };

  useEffect(() => {
    if (email.trim()) {
      schema.isValid({ email }).then((valid) => {
        if (valid) {
          setError(false);
          setRecoverPasswordError('');
        } else {
          setError(true);
          setRecoverPasswordError('E-mail inválido');
        }
      });
    }
  }, [email, schema]);

  return (
    <Container component='main' maxWidth={false}>
      <CssBaseline />
      <S.GetBackIcon>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </S.GetBackIcon>
      <Container component='main' maxWidth='xs'>
        <S.Paper>
          <S.AvatarWrapper>
            <LockOutlinedIcon />
          </S.AvatarWrapper>

          <Typography component='h1' variant='h5'>
            Recuperar senha
          </Typography>
          <S.Form noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Endereço de Email'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={formError}
            />
            {Boolean(recoverPasswordError) && (
              <Typography color='error'>{recoverPasswordError}</Typography>
            )}
            <S.SubmitButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={loading}
              aria-label='Recuperar senha'
            >
              {loading ? (
                <CircularProgress data-testid='login-spinner' size={25} />
              ) : (
                'Recuperar'
              )}
            </S.SubmitButton>
          </S.Form>
        </S.Paper>
      </Container>
    </Container>
  );
};

export default RecoverPassword;
