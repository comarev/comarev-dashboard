import client from './api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { useMutation } from 'react-query';

export const useMutationSignup = () => {
  const history = useHistory();
  return useMutation(signUp, {
    onSuccess: () => {
      toast.success('Autocadastro realizado com sucesso!');
      history.push('/');
    },
    onError: () => {
      toast.error(
        'Não foi possível realizar o autocadastro, por favor tente novamente mais tarde!'
      );
    },
  });
};

const signUp = async (formData) => {
  const { data } = await client.post('/signup.json', {
    user: { ...formData },
  });
  return data;
};
