import { useQuery } from 'react-query';
import { getCompanies } from 'service/company';

const useCompanies = () => {
  const { data, status } = useQuery('companies', getCompanies);

  const companies = data?.data;

  const isLoading = ['idle', 'loading'].includes(status);

  const selectedCompany = !isLoading ? companies[0] : null;
  return {
    selectedCompany,
    companies,
    isLoading,
  };
};

export default useCompanies;
