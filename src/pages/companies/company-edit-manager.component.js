import React, { useEffect } from 'react';
import Template from 'components/template/template.component';
import CompanyForm from './form/company-form.component';
import FormErrors from 'components/form-error/form-errors.component';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core'; 
import { useSelector } from 'react-redux';
import { useCompanyForm } from 'hooks/use-company-form';

export const CompanyEditManager = () => {
  const history = useHistory();
  const pickedCompany = useSelector((state) => state.currentCompany);
  const { company, updateError, updateCompany, isLoading, isSuccess, hasMutationErrors } = useCompanyForm({
    companyId: pickedCompany.id
  })

  useEffect(() => {
    if(isSuccess){
      history.push('/company');
      toast.success('Empresa atualizada com sucesso!');
    }
  }, [isSuccess, history])

  const render = () => {
    if (isLoading) {
      return (
        <Template>
          <CircularProgress testid='company-manager-edit-spinner' size={25} />
        </Template>
      );
    }

    return (
      <Template title='Editar empresa'>
        {hasMutationErrors  && !isLoading && (<FormErrors action='modificação' errors={ updateError } />)}
        <CompanyForm
          company={company}
          loading={isLoading}
          onSubmit={updateCompany}
        />
      </Template>
    );
  };

  return render();
};

