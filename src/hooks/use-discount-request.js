import { useQuery } from 'react-query';
import { getDiscountRequest } from 'service/company';

const useDiscountRequest = (companyId) => {
  const { data, status } = useQuery(
    ['company-discount-request', { id: companyId }],
    () => getDiscountRequest(companyId),
    {
      refetchInterval: 5000,
    }
  );

  const invoicesList = data?.data;

  const isLoading = ['idle', 'loading'].includes(status);

  return { invoicesList, isLoading };
};

export default useDiscountRequest;
