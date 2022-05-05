import { screen, waitFor, fireEvent } from '@testing-library/react';
import wrapper from 'test/test-utils';

import RecoverPassword from '../password-recovery.component';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(),
  };
});

describe('<RecoverPassword />', () => {
  beforeEach(() => {
    wrapper(RecoverPassword);
  });

  it('should render the page with its e-mail address inputs and the submit button', () => {
    expect(screen.getByText(/recuperar senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/endereço de email/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /recuperar/i })
    ).toBeInTheDocument();
  });

  it('should be able to type in the e-mail input', () => {
    const emailInput = screen.getByLabelText(/endereço de email/i);

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });

    expect(emailInput).toHaveValue('email@email.com');
  });

  it('should highlight the input when the user tries to submit with empty a field', () => {
    const emailLabel = screen.getByText('Endereço de Email');
    const submitButton = screen.getByRole('button', { name: /recuperar/i });

    fireEvent.click(submitButton);

    expect(emailLabel).toHaveStyle({ color: '#f44336' });
  });

  it('should highlight the input when the e-mail typed is not valid', async () => {
    const emailInput = screen.getByLabelText(/endereço de email/i);
    const emailLabel = screen.getByText('Endereço de Email');

    fireEvent.change(emailInput, { target: { value: 'email' } });
    await waitFor(() => expect(emailLabel).toHaveStyle({ color: '#f44336' }));
  });
});
