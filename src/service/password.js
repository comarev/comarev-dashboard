import { toast } from 'react-toastify';

import client from './api';
import { useMutation } from 'react-query';

export const useMutationPasswordRecovery = () => {
  return useMutation(passwordRecovery, {
    onSuccess: (data) => {
      toast.success('E-mail de recuperação enviado com sucesso!');
    },
    onError: () => {
      toast.error(
        'Não foi possível enviar o e-mail de recuperação, por favor tente novamente mais tarde!'
      );
    },
  });
};

const passwordRecovery = async (email) => {
  const { data } = await client.post('/users/password', {
    user: { email },
  });
  return data;
};

export const newPassword = async (
  payload,
  onSuccess,
  onError,
  onEnd,
  onStart,
  token
) => {
  try {
    onStart();
    const { password, confirmPassword } = payload;
    // It seems like there isn't still a endpoint to reset a user password
    const result = await client.post('/users/set-password', {
      user: { password, confirmPassword },
    });

    onSuccess({ ...result.data });
  } catch (error) {
    onError(error.response.data.message);
  } finally {
    onEnd();
  }
};
