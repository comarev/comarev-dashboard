import React from 'react';
import CompaniesListing from '../../components/companies-list/companies-list';
import Template from '../../components/template/template.component';
import { newGetCompanies } from '../../service/company';
import { CircularProgress, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import RoleFilter from '../../components/role-filter/role-filter.component';
import { Query, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

const CompaniesList = () => {
  const client = new QueryClient();

  const history = useHistory();

  const { data, isLoading, isError } = useQuery('companies', newGetCompanies);
  const render = () => {
    if (isError) return toast.error('Erro ao carregar empresas!');

    if (isLoading)
      return (
        <Template>
          <Box display='flex' justifyContent='center'>
            <div data-testid='companies-loading'>
              <CircularProgress />
            </div>
          </Box>
        </Template>
      );

    return (
      <Template
        title='Empresas'
        rightActions={
          <RoleFilter roles={['admin']}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => history.push('/companies/new')}
            >
              Cadastrar Empresa
            </Button>
          </RoleFilter>
        }
      >
        <CompaniesListing data={data.data} />
      </Template>
    );
  };

  return render();
};

export default CompaniesList;
