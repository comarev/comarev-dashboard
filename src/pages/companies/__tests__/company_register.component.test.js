import wrapper from '../../../test/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import CompanyRegister from '../company-register.component';

const mockedApi = new MockAdapter(axios);
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const setup = () => {
  wrapper(CompanyRegister);

  const nameField = screen.getByTestId('company-name-input');
  const cnpjField = screen.getByTestId('company-cnpj-input');
  const codeField = screen.getByTestId('company-code-input');
  const submitButton = screen.getByText('Cadastrar Empresa');

  fireEvent.change(nameField, { target: { value: 'Empresa X' } });
  fireEvent.change(cnpjField, { target: { value: '1238712389' } });
  fireEvent.change(codeField, { target: { value: '109234' } });
  fireEvent.click(submitButton);
};

describe('CompanyRegister component', () => {
  describe('when successfully registered', () => {
    beforeEach(() => {
      mockedApi.onPost('/companies').reply(201);
    });

    it('redirect to companies listing, with success message', async () => {
      setup();

      expect(
        await screen.findByText('Empresa cadastrada com sucesso!')
      ).toBeInTheDocument();
      expect(mockHistoryPush).toHaveBeenCalledWith('/companies');
    });
  });
});
