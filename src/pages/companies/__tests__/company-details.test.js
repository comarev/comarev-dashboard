import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import wrapper from '../../../test/test-utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { mockedCompany } from '../../../service/__tests__/fixtures/company';

import CompanyDetails from '../company-details.component';

const mockedApi = new MockAdapter(axios);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('CompanyDetails page', () => {
  describe('when successfully', () => {
    beforeEach(() => {
      mockedApi.onGet('/companies/1').reply(200, { ...mockedCompany });
    });

    it('renders company details', async () => {
      wrapper(CompanyDetails);

      await waitForElementToBeRemoved(screen.getByTestId('company-loading'));

      expect(screen.getByText(mockedCompany.name)).toBeInTheDocument();
    });
  });

  describe('when failure', () => {
    beforeEach(() => {
      mockedApi.onGet('/companies/1').reply(404);
    });

    it('shows errors', async () => {
      wrapper(CompanyDetails);

      await waitForElementToBeRemoved(screen.getByTestId('company-loading'));

      expect(
        await screen.findByText('Erro ao buscar dados da empresa')
      ).toBeInTheDocument();
    });
  });
});
