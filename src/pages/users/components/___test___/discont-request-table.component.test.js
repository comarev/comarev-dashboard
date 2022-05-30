import { render, screen, waitFor } from '@testing-library/react';
import DiscountRequestTable from 'pages/users/components/discont-request-table.component';
import mockedDiscountRequest from 'test/fixtures/discount-request';

const renderTable = (props) =>
  render(<DiscountRequestTable {...props} data-testid='users-loading' />);

const getDiscountRequestTable = () =>
  screen.getByTestId('discount-request-table');

const getDiscountRequestTableRow = (discountRequest) =>
  screen.getByTestId('table-row/' + discountRequest.id);

describe('Discount request table component', () => {
  it('should render', () => {
    renderTable();
    const table = getDiscountRequestTable();
    expect(table).toBeInTheDocument();
  });

  it('should render 3 rows in the table', async () => {
    renderTable({ invoicesList: mockedDiscountRequest });
    await waitFor(() => {
      mockedDiscountRequest.forEach((discountRequest) => {
        expect(getDiscountRequestTableRow(discountRequest)).toBeInTheDocument();
      });
    });
  });
});
