import React, { useState } from 'react';
import Template from 'components/template/template.component';
import UserForm from 'pages/users/form/user-form.component';
import FormErrors from 'components/form-error/form-errors.component';
import { registerUser } from 'service/user';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

const UserRegister = () => {
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const onError = (error) => setFormErrors(error.response.data);

  const onSuccess = () => {
    history.push('/users');
    toast.success('Usuário cadastrado com sucesso!');
  };

  const { mutateAsync, status } = useMutation(registerUser, {
    onError,
    onSuccess,
  });

  const loading = ['loading'].includes(status);

  return (
    <Template title='Novo usuário'>
      {!!formErrors.length && !loading && (
        <FormErrors action='registro' errors={formErrors} />
      )}
      <UserForm onSubmit={mutateAsync} loading={loading} />
    </Template>
  );
};

export default UserRegister;
