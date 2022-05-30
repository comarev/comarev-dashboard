import { render, screen } from '@testing-library/react';
import DiscountRequestTable from 'pages/users/components/discont-request-table.component';
import mockedDiscountRequest from 'test/fixtures/discount-request';

const renderTable = (props) =>
  render(<DiscountRequestTable {...props} data-testid='users-loading' />);

const getTable = () => screen.getByTestId('discount-request-table');
const getAllRows = () => screen.getAllByRole('list');

describe('Discount request table component', () => {
  it('should render', () => {
    renderTable();
    const table = getTable();
    expect(table).toBeInTheDocument();
  });
  it('should render the invoices row', () => {
    renderTable({ invoiceList: mockedDiscountRequest });
    const rows = getAllRows();
    console.log(rows);
    expect(rows.length).toBeInTheDocument(mockedDiscountRequest.length);
  });
});
