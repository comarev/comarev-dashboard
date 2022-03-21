import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import CompaniesList from '../company-list.component';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import mockedCompanies from '../../../test/fixtures/companies';
import wrapper from '../../../test/test-utils';
import { rest } from 'msw';

const API_URL = process.env.REACT_APP_BASE_URL;

describe('Companies List page', () => {
  describe.only('when successfully', () => {
    beforeEach(() => {
      rest.get('/companies', (_, res, ctx) => {
        return res(ctx.json(mockedCompanies));
      });

      it('render companies in the table', async () => {});

      wrapper(CompaniesList);

      await waitForElementToBeRemoved(screen.getByTestId('companies-loading'));

      mockedCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    });
  });

  describe('when failure', () => {
    beforeEach(() => {
      rest.get('/companies', (_, res, ctx) => {
        return res(ctx.status(400));
      });
    });

    it('shows error', async () => {
      wrapper(CompaniesList);

      await waitForElementToBeRemoved(screen.getByTestId('companies-loading'));

      expect(
        await screen.findByText('Erro ao carregar empresas!')
      ).toBeInTheDocument();
    });
  });
});
