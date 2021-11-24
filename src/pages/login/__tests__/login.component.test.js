import SignIn from '../login.component';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../service/api';
import { fireEvent, act } from '@testing-library/react';
import wrapper from '../../../test/test-utils';
import { userData } from '../../../test/mocks/user';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Redirect: () => (
    <>
      <p>redirect</p>
    </>
  ),
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

  act(() => {
    fireEvent.click(submitButton);
  });

  return rendered;
};

describe('Login Component', () => {
  const token = 'random-token';

  beforeEach(() => {
    mock.onPost('/login').reply(200, userData, {
      authorization: token,
    });
  });

  describe('when the request happens', () => {
    it('disables submit button and shows spinner', async () => {
      const { getByTestId, findByText } = setup();

      expect(getByTestId('login-spinner')).toBeInTheDocument();
      await findByText('redirect');
    });

    it('disables the submit button', async () => {
      const { findByText, getByLabelText } = setup();

      expect(getByLabelText('Logar')).toBeDisabled();
      await findByText('redirect');
    });
  });

  describe('when successfully', () => {
    it('redirects to dashboard', async () => {
      const { queryByTestId, findByText } = setup();

      queryByTestId('login-spinner');
      await findByText('redirect');

      expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });

    it('persist user data into localStorage', async () => {
      const { queryByTestId, findByText } = setup();

      queryByTestId('login-spinner');
      await findByText('redirect');

      const result = window.localStorage.getItem('user');

      expect(JSON.parse(result)).toEqual({ ...userData, userToken: token });
    });
  });

  describe('when failure', () => {
    beforeEach(() => {
      mock.onPost('/login').reply(401, 'Email ou senha inválida.');
    });

    it('renders error message', async () => {
      const { findByText } = setup();

      const error = await findByText('Email ou senha inválida.');
      expect(error).toBeInTheDocument();
    });
  });

  describe('when user does not fill out the fields', () => {
    it('highlight border fields', () => {
      const { getByText } = wrapper(SignIn);

      const emailLabel = getByText('Endereço de Email');
      const submitButton = getByText('Logar');

      fireEvent.click(submitButton);

      expect(emailLabel).toHaveStyle({ color: '#f44336' });
    });
  });
});
