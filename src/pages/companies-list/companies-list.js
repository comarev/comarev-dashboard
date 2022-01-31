import React, { useState, useEffect } from 'react';
import CompaniesListing from '../../components/companies-list/companies-list';
import Template from '../../components/template/template.component';
import { getCompanies } from '../../service/company';
import { toast } from 'react-toastify';
import { CircularProgress, Box, Button } from '@material-ui/core';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const onStart = () => {
    setLoading(true);
  };

  const onSuccess = (data) => {
    setCompanies(data);
  };

  const onFailure = () => {
    toast.error('Erro ao carregar empresas!');
  };

  const onCompleted = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!companies.length)
      getCompanies({ onSuccess, onStart, onFailure, onCompleted });
  }, [companies]);

  const render = () => {
    if (loading)
      return (
        <Box display='flex' justifyContent='center'>
          <div data-testid='companies-loading'>
            <CircularProgress />
          </div>
        </Box>
      );

    return (
      <>
        <h2>Empresas</h2>
        <Button
          variant='contained'
          color='primary'
          href='/companies/new'
          style={{ marginBottom: '20px' }}
        >
          Cadastrar Empresa
        </Button>
        <CompaniesListing data={companies} />
      </>
    );
  };

  return <Template>{render()}</Template>;
};

export default CompaniesList;
