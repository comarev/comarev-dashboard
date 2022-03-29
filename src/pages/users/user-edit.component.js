import React, { useState } from 'react';
import Template from 'components/template/template.component';
import UserForm from 'pages/user/form/user-form.component';
import FormErrors from 'components/form-error/form-errors.component';
import { getUser, updateUser } from 'service/user';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CircularProgress } from '@material-ui/core';

const UserEdit = () => {
  const [formErrors, setFormErrors] = useState([]);
  const params = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, status } = useQuery(['user', { id: params.id }], () =>
    getUser(params.id)
  );
  const isLoading = ['idle', 'loading'].includes(status);

  const onError = (error) => setFormErrors(error.response.data);

  const onSuccess = () => {
    queryClient.invalidateQueries('user', { id: params.id });
    history.push('/users');
    toast.success('Usuário atualizado com sucesso!');
  };

  const { mutateAsync } = useMutation(updateUser, {
    onError,
    onSuccess,
  });

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='user-edit-spinner' size={25} />;
        </Template>
      );

    return (
      <Template title='Editar usuário'>
        {!!formErrors.length && !isLoading && (
          <FormErrors action='registro' errors={formErrors} />
        )}
        <UserForm
          onSubmit={mutateAsync}
          loading={isLoading}
          user={data?.data}
        />
      </Template>
    );
  };

  return render();
};

export default UserEdit;
