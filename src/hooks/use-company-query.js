import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getCompany } from 'service/company';

export const useCompanyQuery = (companyId) => {
  const currentCompany = useSelector(state => state.currentCompany);
  const isStateDefaultValue =  ( currentCompany.id === 0 ? true : false )
  const { data, status, isError, error } = useQuery(['company', companyId] ,() => getCompany(companyId) , { enabled: !isStateDefaultValue,  } );

  return {
    getCompany: data?.data,
    isLoading: ['idle', 'loading'].includes(status),
    isError,
    companyQueryError: error?.response
  }
}
