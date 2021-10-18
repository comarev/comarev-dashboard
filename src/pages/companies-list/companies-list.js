import React, { useState, useEffect } from 'react';
import CompaniesListing from '../../components/template/companies-listing-grid';
import instance from '../../service/api';
import Template from '../../components/template/template.component';
import { useSelector } from 'react-redux';

const CompaniesList = () => {
  // eslint-disable-next-line
  const user = useSelector((state) => state.user);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    instance.get('/companies').then((res) => setCompanies(res.data));
    return () => {};
  }, []);

  return (
    <Template>
      <CompaniesListing data={companies} />
    </Template>
  )};

export default CompaniesList;
