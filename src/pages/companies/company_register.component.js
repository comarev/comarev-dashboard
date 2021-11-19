import React, { useState } from 'react';
import Template from '../../components/template/template.component';
import CompanyForm from './form/company_form.component';
import FormErrors from '../../components/form_error/form_errors.component';
import { registerCompany } from '../../service/company';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CompanyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const history = useHistory();

  const onStart = () => setLoading(true);
  const onError = (errors) => setFormErrors(errors);
  const onCompleted = () => setLoading(false);

  const onSuccess = () => {
    history.push('/companies');
    toast.success('Empresa cadastrada com sucesso!');
  };

  const onSubmit = (payload) => {
    registerCompany({ payload, onStart, onSuccess, onError, onCompleted });
  };

  return (
    <Template>
      <h2>Cadastrar empresa</h2>
      {!!formErrors.length && !loading && (
        <FormErrors action='registro' errors={formErrors} />
      )}
      <CompanyForm onSubmit={onSubmit} loading={loading} />
    </Template>
  );
};

export default CompanyRegister;
