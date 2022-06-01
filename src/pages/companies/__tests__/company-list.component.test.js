import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import CompaniesList from 'pages/companies/company-list.component';
import MockAdapter from 'axios-mock-adapter';
import axios from 'service/api';
import mockedCompanies from 'test/fixtures/companies';
import wrapper from 'test/test-utils';

const mock = new MockAdapter(axios);

describe('Companies List page', () => {
  describe('when successfully', () => {
    beforeEach(() => {
      mock.onGet('/companies').reply(200, mockedCompanies);
    });

    it('render companies in the table', async () => {
      wrapper(<CompaniesList />);

      await waitForElementToBeRemoved(screen.getByTestId('companies-loading'));

      mockedCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    });
  });

  describe('when failure', () => {
    beforeEach(() => {
      mock.onGet('/companies').reply(400);
    });

    it('shows error', async () => {
      wrapper(<CompaniesList />);

      await waitForElementToBeRemoved(screen.getByTestId('companies-loading'));

      expect(
        await screen.findByText('Erro ao carregar empresas!')
      ).toBeInTheDocument();
    });
  });
});
