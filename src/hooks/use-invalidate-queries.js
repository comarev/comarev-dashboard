import { useQueryClient } from 'react-query';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = (queryKey, queryParams) => {
    queryClient.invalidateQueries(queryKey, queryParams);
  }
  return({ invalidateQueries });
  
}

