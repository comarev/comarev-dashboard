import React, { useState } from 'react';
import Template from 'components/template/template.component';
import FormErrors from 'components/form-error/form-errors.component';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import InvoiceForm from 'pages/invoices/form/invoice-form.component';
import { registerInvoice } from 'service/invoice';

const InvoiceRegister = () => {
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const onError = (error) => setFormErrors(error.response.data);

  const onSuccess = () => {
    history.push('/invoices');
    toast.success('Fatura cadastrada com sucesso!');
  };

  const { mutateAsync, status } = useMutation(registerInvoice, {
    onError,
    onSuccess,
  });

  const loading = ['loading'].includes(status);

  return (
    <Template title='Nova fatura'>
      {!!formErrors.length && !loading && (
        <FormErrors action='registro' errors={formErrors} />
      )}
      <InvoiceForm onSubmit={(data) => mutateAsync(data)} loading={loading} />
    </Template>
  );
};

export default InvoiceRegister;
