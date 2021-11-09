import { render } from '@testing-library/react';
import FormErrors from '../form_errors.component';

describe('FormErros Component', () => {
  describe('when just one error', () => {
    it('renders the error', () => {
      const error = ['SomeField cannot be blank'];

      const rendered = render(<FormErrors errors={error} action='Create' />);
      const { getByText } = rendered;

      expect(
        getByText('Houve um erro que impediu o(a) Create:')
      ).toBeInTheDocument();
      expect(getByText('SomeField cannot be blank')).toBeInTheDocument();
    });
  });

  describe('when more than one error', () => {
    it('renders the errors', () => {
      const errors = [
        'SomeField cannot be blank',
        'OtherField has already been used',
      ];

      const rendered = render(<FormErrors errors={errors} action='Create' />);
      const { getByText } = rendered;

      expect(
        getByText('Alguns erros impediram o(a) Create:')
      ).toBeInTheDocument();
      expect(getByText('SomeField cannot be blank')).toBeInTheDocument();
      expect(getByText('OtherField has already been used')).toBeInTheDocument();
    });
  });
});
