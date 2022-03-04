import wrapper from '../../../test/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import CompanyRegister from '../company-register.component';

const mockedApi = new MockAdapter(axios);
const mockHistoryPush = jest.fn(),
isValid = true

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    pathname: '/companies'
  })
}));

const setup = async () => {
  wrapper(CompanyRegister);

  const nameField = screen.getByTestId('company-name-input');
  const cnpjField = screen.getByTestId('company-cnpj-input');
  const discountField = screen.getByTestId('company-discount-input');
  const activeField = screen.getByTestId('company-active-input');

  const continueButton = screen.getByText('Continuar');

  // console.log(continueButton)

  fireEvent.change(nameField, { target: { value: 'Empresa X' } });
  fireEvent.change(cnpjField, { target: { value: '11231231231231' } });
  fireEvent.change(discountField, { target: { value: 10 } });

  console.log(continueButton)

  fireEvent.click(continueButton);

  // const submitButton = await screen.getByText('Cadastrar Empresa');
  // fireEvent.click(submitButton);
};

describe('CompanyRegister component', () => {
  describe('when successfully registered a new company', () => {
    beforeEach(() => {
      mockedApi.onPost('/companies').reply(201);
    });

    it('redirect to companies listing, with success message', async () => {
      console.log('teste')
      setup();

      const button = screen.getByText('Continuar');

      fireEvent.click(button);

      expect(
        await screen.findByText('Continuar')
      ).toBeInTheDocument();
      expect(await screen.getByText(/Continuar/i).closest('button')).toBeDisabled();
      expect(mockHistoryPush).toHaveBeenCalledWith('/companies');
    });
  });
});
