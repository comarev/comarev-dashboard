import { useQuery } from 'react-query';
import { getCompanies } from 'service/company';

const useCompanies = () => {
  const { data, isLoading, isError } = useQuery('companies', getCompanies);
  const companies = data?.data || [];

  return { companies, isLoading, isError };
}

export default useCompanies;
