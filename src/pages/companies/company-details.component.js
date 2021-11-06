import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCompany } from '../../service/company';

import Template from '../../components/template/template.component';
import { CircularProgress, Box } from '@material-ui/core';

const initialCompanyState = { id: 0, name: 'Initial' };

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(initialCompanyState);
  const [loading, setLoading] = useState(false);

  const onStart = () => setLoading(true);
  const onSuccess = (data) => setCompany(data);
  const onFailure = () => toast.error('Erro ao buscar dados da empresa');
  const onCompleted = () => setLoading(false);

  useEffect(() => {
    if (!company.id)
      fetchCompany({ id, onStart, onSuccess, onFailure, onCompleted });
  }, [company, id]);

  const render = () => {
    if (loading)
      return (
        <Box display='flex' justifyContent='center'>
          <div data-testid='company-loading'>
            <CircularProgress />
          </div>
        </Box>
      );

    return (
      <>
        <h1>Detalhamento empresa</h1>
        <p>{company.name}</p>
      </>
    );
  };

  return <Template>{render()}</Template>;
};

export default CompanyDetails;
