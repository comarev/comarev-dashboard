import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
/* import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid'; */
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
/* import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'store/modules/user/actions'; */
import * as yup from 'yup';

import { passwordRecovery } from 'service/password';

const useStyles = makeStyles((theme) => ({
  getBackIcon: {
    marginTop: theme.spacing(4),
    cursor: 'pointer',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RecoverPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [formError, setError] = useState(false);
  const [recoverPasswordError, setRecoverPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  /* const dispatch = useDispatch(); */
  /* const user = useSelector((state) => state.user); */

  const onStart = () => setLoading(true);
  const onEnd = () => setLoading(false);
  const onSuccess = (data) => {
    /* dispatch(loginUser(data)); */

    /* localStorage.setItem('user', JSON.stringify(data)); */
    toast.success('E-mail de recuperação enviado com sucesso!');
    console.log(data);
  };

  const schema = yup.object().shape({
    email: yup.string().email('e-mail inválido').required(),
  });

  const onError = (message) => {
    toast.error('Erro, tente novamente mais tarde!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    <Container component='main' maxWidth='lg'>
      <CssBaseline />
      <Tooltip title='Voltar para página de login' arrow>
        <ArrowBackIcon
          className={classes.getBackIcon}
          onClick={() => history.goBack()}
        />
      </Tooltip>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <i className='fa-solid fa-arrow-left'></i>
          <Typography component='h1' variant='h5'>
            Recuperar senha
          </Typography>
          <form className={classes.form} noValidate>
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
              disabled={loading || formError}
              aria-label='Recuperar senha'
            >
              {loading ? (
                <CircularProgress data-testid='login-spinner' size={25} />
              ) : (
                'Recuperar'
              )}
            </Button>
          </form>
        </div>
      </Container>
    </Container>
  );
};

export default RecoverPassword;
