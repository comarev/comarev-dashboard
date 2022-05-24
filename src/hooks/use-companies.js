import { useQuery } from 'react-query';
import { getCompanies } from 'service/company';

const useCompanies = () => {
  const { data, status } = useQuery('companies', getCompanies);
  const companies = data?.data;

  const isLoading = ['idle', 'loading'].includes(status);

  return {
    companies,
    isLoading,
  };
};

export default useCompanies;
