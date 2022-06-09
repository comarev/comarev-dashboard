import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import wrapper from 'test/test-utils';

import SignUp from '../signup.component';

let mockIsLoading = false;

jest.mock('service/signup', () => ({
  useMutationSignup: () => ({
    isLoading: mockIsLoading,
  }),
}));

describe('<SignUp />', () => {
  it('renders the title and all the inputs', () => {
    wrapper(<SignUp />);
    expect(
      screen.getByRole('heading', { name: /cadastre-se/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /nome completo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /e-mail/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /cpf/i })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /telefone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /endereço/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cadastrar/i })
    ).toBeInTheDocument();
  });

  it('first renders with a disabled submit button', () => {
    wrapper(<SignUp />);
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeDisabled();
  });

  it('should enable submit button when validation passes', async () => {
    wrapper(<SignUp />);
    const full_name = screen.getByRole('textbox', { name: /nome completo/i });
    const email = screen.getByRole('textbox', { name: /e-mail/i });
    const cpf = screen.getByRole('textbox', { name: /cpf/i });
    const phone = screen.getByRole('textbox', { name: /telefone/i });
    const address = screen.getByRole('textbox', { name: /endereço/i });
    const password = screen.getByLabelText(/^senha/i);
    const confirmPassword = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(full_name, 'John Doe');
    userEvent.type(email, 'user@example.org');
    userEvent.type(cpf, '12345670088');
    userEvent.type(phone, '12345678901');
    userEvent.type(address, 'Test Street, 123');
    userEvent.type(password, '12345678');
    userEvent.type(confirmPassword, '12345678');

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  describe('When it is loading', () => {
    beforeEach(() => {
      mockIsLoading = true;
      wrapper(<SignUp />);
    });

    it('should show loading spinner when user submits form', () => {
      expect(
        screen.getByRole('img', { name: /loading spinner/i })
      ).toBeInTheDocument();
    });

    it('should disbles button when user submits form', () => {
      expect(
        screen.getByRole('button', { name: /carregando/i })
      ).toBeDisabled();
    });
  });
});
