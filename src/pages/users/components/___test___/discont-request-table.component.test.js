import { render, screen, waitFor } from '@testing-library/react';
import DiscountRequestTable, {
  getAllowedCellLabelColor,
  getAllowedCellLabel,
} from 'pages/users/components/discont-request-table.component';
import mockedDiscountRequest from 'test/fixtures/discount-request';
import { getDateFormated, getHourFormated } from 'utils/formatters/general';

const renderTable = (props) =>
  render(<DiscountRequestTable {...props} data-testid='users-loading' />);

const getDiscountRequestTable = () =>
  screen.getByTestId('discount-request-table');

const getDiscountRequestTableRow = (discountRequest) =>
  screen.getByTestId('table-row/' + discountRequest.id);

const getDiscountRequestTableRowChip = (discountRequest) =>
  screen.getByTestId('table-row/chip/' + discountRequest.id);

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

  it('render the right information on the rows', async () => {
    renderTable({ invoicesList: mockedDiscountRequest });
    await waitFor(() => {
      mockedDiscountRequest.forEach((discountRequest) => {
        const row = getDiscountRequestTableRow(discountRequest);
        const chip = getDiscountRequestTableRowChip(discountRequest);
        expect(row).toBeInTheDocument();

        expect(row).toHaveTextContent(discountRequest.user.full_name);
        expect(row).toHaveTextContent(discountRequest.user.email);
        expect(row).toHaveTextContent(
          getDateFormated(discountRequest.created_at)
        );
        expect(row).toHaveTextContent(
          getHourFormated(discountRequest.created_at)
        );
        expect(row).toHaveTextContent(
          getAllowedCellLabel(discountRequest.allowed)
        );
      });
    });
  });
});
