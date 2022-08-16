import Template from 'components/template/template.component';
import useDiscountRequest from 'hooks/use-discount-request';
import useCompanies from 'hooks/use-companies';
import DiscountRequestTable from './components/discount-request-table.component';
import useCompaniesSelectionMenuItem from 'hooks/use-companies-selection-menu-item';
import { TextField, MenuItem } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const DiscountRequests = () => {
  const { companies, isLoading: isLoadingCompanies } = useCompanies();

  const { selectedCompanyId, handleChangeCompany } =
    useCompaniesSelectionMenuItem(companies);

  const { invoicesList, isLoading: isLoadingDiscountRequest } =
    useDiscountRequest(selectedCompanyId);

  const render = () => {
    if (isLoadingCompanies) {
      return (
        <Template>
          <CircularProgress testid='company-edit-spinner' size={25} />
        </Template>
      );
    }

    return (
      <Template title='Pedidos de desconto'>
        <TextField
          label='Empresa'
          select
          onChange={handleChangeCompany}
          value={selectedCompanyId}
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>
        {isLoadingDiscountRequest ? (
          <CircularProgress testid='company-edit-spinner' size={25} />
        ) : (
          <DiscountRequestTable invoicesList={invoicesList} />
        )}
      </Template>
    );
  };

  return render();
};

export default DiscountRequests;
