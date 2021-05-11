import SignIn from '../login.component';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import { fireEvent } from '@testing-library/react';
import wrapper from '../../../test/test-utils';
import { userData } from '../../../test/mocks/user';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mock = new MockAdapter(axios);

const setup = () => {
  const rendered = wrapper(SignIn);

  const { getByText, getByLabelText } = rendered;

  const emailField = getByLabelText('Endereço de Email *');
  const passwordField = getByLabelText('Senha *');
  const submitButton = getByText('Logar');

  fireEvent.change(emailField, { target: { value: 'email@email.com' } });
  fireEvent.change(passwordField, { target: { value: 'senha_errada' } });
  fireEvent.click(submitButton);

  return rendered;
};

describe('Login Component', () => {
  beforeEach(() => {
    mock.onPost('/login').reply(200, userData);
  });

  describe('when the request happens', () => {
    it('disable submit button and shows spinner', async () => {
      const { queryByTestId, findByText } = setup();

      queryByTestId('login-spinner');
      await findByText('Logar');
      /* temos que informar pro React que a ação de voltar
      o estado para false é proposital, senão será lançado
      um warning no terminal

      https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning*/
    });

    it('disable the submit button', async () => {
      const { findByText, getByLabelText } = setup();

      /* não é necessário testar se está disabled, pois teoricamente
      a responsabilidade é do MaterialUI
      Este teste foi realizado para estudos
      */
      expect(getByLabelText('Logar')).toBeDisabled();
      await findByText('Logar');
    });
  });

  describe('when successfully', () => {
    it('redirects to dashboard', async () => {
      const { queryByTestId, findByText } = setup();

      queryByTestId('login-spinner');
      await findByText('Logar');

      expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('when failure', () => {
    beforeEach(() => {
      mock.onPost('/login').reply(401, 'Email ou senha inválida.');
    });

    it('renders error message', async () => {
      const { findByText } = setup();

      await findByText('Email ou senha inválida.');
    });
  });

  describe('when user does not fill fields', () => {
    it('highlight border fields', () => {
      const { getByText } = wrapper(SignIn);

      const emailLabel = getByText('Endereço de Email');
      const submitButton = getByText('Logar');

      fireEvent.click(submitButton);

      expect(emailLabel).toHaveStyle({ color: '#f44336' });
    });
  });
});
