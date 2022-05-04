import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
/* import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'store/modules/user/actions'; */

import { newPassword } from 'service/password';
import * as yup from 'yup';

/* const FORM_ERROR_INITIAL_STATE = {
  password: false,
  confirmPassword: false,
}; */

const useStyles = makeStyles((theme) => ({
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

const ResetPassword = () => {
  const { token } = useParams();

  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setError] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  /* const dispatch = useDispatch(); */
  /* const user = useSelector((state) => state.user); */

  const onStart = () => setLoading(true);
  const onEnd = () => setLoading(false);
  const onSuccess = (data) => {
    /* dispatch(loginUser(data)); */

    /* localStorage.setItem('user', JSON.stringify(data)); */
    console.log(data);

    history.push('/');
  };

  const onError = (message) => {
    setResetPasswordError(message);
  };

  const schema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Regex to validate the email
    if (!password || !confirmPassword) {
      setError(true);
      return;
    }

    const payload = { password, confirmPassword };

    await newPassword(payload, onSuccess, onError, onEnd, onStart, token);
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
  }, [password, confirmPassword]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Redefinir senha
        </Typography>
        <form className={classes.form} noValidate>
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading || formError}
            aria-label='redefinir senha'
          >
            {loading ? (
              <CircularProgress data-testid='login-spinner' size={25} />
            ) : (
              'Redefinir'
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
