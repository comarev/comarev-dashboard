import { screen, fireEvent, waitFor } from '@testing-library/react';
import wrapper from 'test/test-utils';
import ResetPassword from '../reset-password.component';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(),
  };
});

describe('<ResetPassword />', () => {
  beforeEach(() => {
    wrapper(ResetPassword);
  });

  it('should render the page with its inputs and a submit button', () => {
    expect(screen.getByText(/redefinir senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /redefinir/i })
    ).toBeInTheDocument();
  });

  it('should highlight the inputs when the user tries to submit with empty fields', () => {
    const passwordLabel = screen.getByText('Senha');
    const confirmPasswordLabel = screen.getByText('Confirmar senha');
    const submitButton = screen.getByRole('button', { name: /redefinir/i });

    fireEvent.click(submitButton);

    expect(passwordLabel).toHaveStyle({ color: '#f44336' });
    expect(confirmPasswordLabel).toHaveStyle({ color: '#f44336' });
  });

  it('should highlight the inputs when the passwords do not match', async () => {
    const passwordInput = screen.getByLabelText(/^senha/i);
    const passwordLabel = screen.getByText('Senha');
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const confirmPasswordLabel = screen.getByText('Confirmar senha');

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '1234' } });

    await waitFor(() =>
      expect(passwordLabel).toHaveStyle({ color: '#f44336' })
    );
    await waitFor(() =>
      expect(confirmPasswordLabel).toHaveStyle({ color: '#f44336' })
    );
  });
});
