import { useEffect, useState } from 'react';

const useCompaniesSelectionMenuItem = (companies) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    if (companies?.length) {
      setSelectedCompanyId(companies[0].id);
    }
  }, [companies]);

  const handleChangeCompany = (event) => {
    setSelectedCompanyId(event.target.value);
  };

  return { selectedCompanyId, handleChangeCompany };
};

export default useCompaniesSelectionMenuItem;
