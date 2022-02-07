import React, { useState } from 'react';
import Template from '../../components/template/template.component';
import InvoiceForm from './form/invoice-form.component';
import FormErrors from '../../components/form-error/form-errors.component';
import { getInvoice, updateInvoice } from '../../service/invoice';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CircularProgress } from '@material-ui/core';

const InvoiceEdit = () => {
  const [formErrors, setFormErrors] = useState([]);
  const params = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, status } = useQuery(['invoice', { id: params.id }], () =>
    getInvoice(params.id)
  );
  const isLoading = ['idle', 'loading'].includes(status);

  const onError = (error) => setFormErrors(error.response.data);

  const onSuccess = () => {
    queryClient.invalidateQueries('invoice', { id: params.id });
    history.push('/invoices');
    toast.success('Fatura atualizada com sucesso!');
  };

  const { mutateAsync } = useMutation(updateInvoice, {
    onError,
    onSuccess,
  });

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='invoice-edit-spinner' size={25} />;
        </Template>
      );

    return (
      <Template title='Editar fatura'>
        {!!formErrors.length && !isLoading && (
          <FormErrors action='registro' errors={formErrors} />
        )}
        <InvoiceForm
          onSubmit={mutateAsync}
          loading={isLoading}
          invoice={{
            ...data?.data,
            amount: data?.data.amount.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }),
          }}
        />
      </Template>
    );
  };

  return render();
};

export default InvoiceEdit;
