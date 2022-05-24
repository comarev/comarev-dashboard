import { useEffect, useState } from 'react';

const useCompaniesSelectionMenuItem = (companies) => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (companies?.length >= 1) {
      setSelectedCompany(companies?.[0]);
    }
  }, [companies]);
  return { selectedCompany, setSelectedCompany };
};

export default useCompaniesSelectionMenuItem;
