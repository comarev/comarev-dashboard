import React, {useEffect} from 'react';
import Template from 'components/template/template.component';
import CompanyForm from './form/company-form.component';
import FormErrors from 'components/form-error/form-errors.component';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import { useCompanyForm } from 'hooks/use-company-form';

const CompanyEdit = () => {
  const params = useParams();
  const history = useHistory();

  const {company, companyQueryError, hasErrors, updateCompany, isLoading, isSuccess } = useCompanyForm({companyId: params.id})

  useEffect(() => {
    if(isSuccess){
      history.push('/company');
      toast.success('Empresa atualizada com sucesso!');
    }
  }, [isSuccess, history])

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='company-edit-spinner' size={25} />;
        </Template>
      );

    return (
      <Template title='Editar empresa'>
        {hasErrors && !isLoading && (
          <FormErrors action='alteração' errors={companyQueryError} />
        )}
        <CompanyForm
          onSubmit={updateCompany}
          loading={isLoading}
          company={company}
        />
      </Template>
    );
  };

  return render();
};

export default CompanyEdit;
