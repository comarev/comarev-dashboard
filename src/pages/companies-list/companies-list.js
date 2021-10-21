import React, { useState, useEffect } from 'react';
import CompaniesListing from '../../components/template/companies-listing-grid';
import service from '../../service/api';
import { useSelector } from 'react-redux';
import Template from '../../components/template/template.component';

const CompaniesList = () => {
  const user = useSelector((state) => state.user);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    service.get('/companies').then((res) => setCompanies(res.data));
    console.log(companies)
    return () => {};
  }, [companies]);

  return (
    <Template>
      <CompaniesListing data={companies} />
    </Template>
  )};

export default CompaniesList;
