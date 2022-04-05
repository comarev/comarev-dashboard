import React, { useState } from 'react';
import Template from 'components/template/template.component';
import CompanyForm from './form/company-form.component';
import FormErrors from 'components/form-error/form-errors.component';
import { getCompany, updateCompany } from 'service/company';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CircularProgress } from '@material-ui/core';

const CompanyEdit = () => {
  const [formErrors, setFormErrors] = useState([]);
  const params = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, status } = useQuery(['company', { id: params.id }], () =>
    getCompany(params.id)
  );
  const isLoading = ['idle', 'loading'].includes(status);

  const onError = (error) => setFormErrors(error.response.data);

  const onSuccess = () => {
    queryClient.invalidateQueries('company', { id: params.id });
    history.push('/companies');
    toast.success('Empresa atualizada com sucesso!');
  };

  const { mutateAsync } = useMutation(updateCompany, {
    onError,
    onSuccess,
  });

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='company-edit-spinner' size={25} />;
        </Template>
      );

    return (
      <Template title='Editar empresa'>
        {!!formErrors.length && !isLoading && (
          <FormErrors action='registro' errors={formErrors} />
        )}
        <CompanyForm
          onSubmit={mutateAsync}
          loading={isLoading}
          company={data?.data}
        />
      </Template>
    );
  };

  return render();
};

export default CompanyEdit;
