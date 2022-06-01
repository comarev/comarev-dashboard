import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  getByRole,
  getAllByRole,
} from '@testing-library/react';
import DiscountRequests from '../user-discount-request.component';
import MockAdapter from 'axios-mock-adapter';
import axios from 'service/api';
import mockedCompanies from 'test/fixtures/companies';
import mockedDiscountRequest from 'test/fixtures/discount-request';
import wrapper from 'test/test-utils';
import userEvent from '@testing-library/user-event';

const mock = new MockAdapter(axios);

const renderPage = () => wrapper(DiscountRequests);

const getLoadingCompanyComponent = () =>
  screen.getByTestId('company-edit-spinner');

const getLoadingDiscountRequestsComponent = () =>
  screen.getByTestId('discount-request-edit-spinner');

const getDiscountRequestTable = () =>
  screen.getByTestId('discount-request-table');

const getCompaniesMenuItemTextField = () =>
  screen.getByTestId('company-selector');

const getCompaniesMenuOptions = () => screen.getByRole('listbox');

const getCompaniesMenuSelectedOption = () =>
  getByRole(getCompaniesMenuItemTextField(), 'button');

const getCompaniesMenuSecondOption = () =>
  getAllByRole(getCompaniesMenuOptions(), 'option')[1];

const openMenuItemSelector = () =>
  fireEvent.mouseDown(getCompaniesMenuSelectedOption());

const changeMenuItemSelection = (toBeSelected) => fireEvent.click(toBeSelected);

const mockGetCompanies = () =>
  mock.onGet('/companies').reply(200, mockedCompanies);

const mockGetDiscountRequest = () => {
  mockedCompanies.forEach((company) => {
    mock
      .onGet(`/companies/${company.id}/discount_requests`)
      .reply(200, mockedDiscountRequest);
  });
};

describe('User discount request page', () => {
  beforeEach(() => {
    mockGetCompanies();
    mockGetDiscountRequest();
  });

  it('loading component rendered during the companies fetching', async () => {
    renderPage();
    const loadingCompanyComponent = getLoadingCompanyComponent();
    expect(loadingCompanyComponent).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingCompanyComponent);
    expect(loadingCompanyComponent).not.toBeInTheDocument();
  });

  it('loading component rendered during the discount request fetching', async () => {
    renderPage();
    await waitFor(async () => {
      const loadingDiscountRequestTable = getLoadingDiscountRequestsComponent();
      expect(loadingDiscountRequestTable).toBeInTheDocument();
      await waitForElementToBeRemoved(loadingDiscountRequestTable);
      expect(loadingDiscountRequestTable).not.toBeInTheDocument();
    });
  });

  it('company menu item with the first company fetched', async () => {
    renderPage();
    await waitFor(async () => {
      const companiesMenutem = getCompaniesMenuItemTextField();
      expect(companiesMenutem).toBeInTheDocument();
      expect(companiesMenutem).toHaveTextContent(mockedCompanies[0].name);
    });
  });

  it('load the discount request table', async () => {
    renderPage();
    await waitFor(async () => {
      const discountRequestTable = getDiscountRequestTable();
      expect(discountRequestTable).toBeInTheDocument();
    });
  });

  it('refetch discount request table on menu item change', async () => {
    renderPage();
    await waitFor(async () => {
      openMenuItemSelector();
      changeMenuItemSelection(getCompaniesMenuSecondOption());

      const loadingDiscountRequestTable = getLoadingDiscountRequestsComponent();
      expect(loadingDiscountRequestTable).toBeInTheDocument();
      await waitForElementToBeRemoved(loadingDiscountRequestTable);
      expect(getDiscountRequestTable()).toBeInTheDocument();
    });
  });
});
