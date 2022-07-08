import { updateCompany } from 'service/company';
import FormErrors from 'components/form-error/form-errors.component';
import { useCompanyQuery } from 'hooks/use-company-query';
import { useMutation } from 'react-query';
import { useInvalidateQueries } from 'hooks/use-invalidate-queries';
import { useDispatch } from 'react-redux';
import { updateUserCompany } from 'store/modules/user/actions';

export const useCompanyForm = ({ companyId }) =>{
  const dispatch = useDispatch();
  const { getCompany, isLoading, isError, companyQueryError } = useCompanyQuery(companyId);
  const { invalidateQueries } = useInvalidateQueries();

  const { mutateAsync, isSuccess, error, isError: mutationError} = useMutation(updateCompany, {
    companyQueryError,
    onSuccess: (data) => {
      invalidateQueries('company', { id: companyId });
      dispatch(updateUserCompany(data.data))
    },
  });

  return {
    company: getCompany,
    isLoading,
    companyQueryError,
    updateError: error?.response?.data,
    hasQueryErrors: isError,
    hasMutationErrors: mutationError,
    updateCompany: mutateAsync,
    FormErrorsComponent: FormErrors,
    isSuccess
  }
}
