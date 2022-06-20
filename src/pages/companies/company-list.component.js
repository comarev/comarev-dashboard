import React from 'react';
import CompaniesListing from 'components/companies-list/companies-list';
import Template from 'components/template/template.component';
import { CircularProgress, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useCompanies from 'hooks/use-companies';
import RoleFilter from 'components/role-filter/role-filter.component';

const CompaniesList = () => {
  const history = useHistory();

  const {companies, isLoading, isError} = useCompanies()

  const render = () => {
    if (isError) {
      return (
      <Template>
        <span>Erro ao carregar empresas!</span>
      </Template>
      )
    }

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
        <CompaniesListing data={companies} />
      </Template>
    );
  };

  return render();
};

export default CompaniesList;
