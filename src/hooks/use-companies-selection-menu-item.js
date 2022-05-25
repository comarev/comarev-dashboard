import { useEffect, useState } from 'react';

const useCompaniesSelectionMenuItem = (companies) => {
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    if (companies?.length) {
      setSelectedCompany(companies[0].id);
    }
  }, [companies]);

  const handleChangeCompany = (event) => {
    setSelectedCompany(event.target.value);
  };

  return { selectedCompany, handleChangeCompany };
};

export default useCompaniesSelectionMenuItem;
