import { render } from '@testing-library/react';
import FormErrors from 'components/form-error/form-errors.component';

describe('FormErros Component', () => {
  describe('when it receives an error', () => {
    describe('when useQuery throws an error ', () => {
      it('renders the error', () => {
        const errorObj = { message: 'SomeField cannot be blank' };

        const { getByText } = render(
          <FormErrors errors={errorObj} action='Create' />
        );

        expect(
          getByText('Alguns erros impediram o(a) Create.')
        ).toBeInTheDocument();
        expect(getByText('SomeField cannot be blank')).toBeInTheDocument();
      });
    });
    describe('when the server throws an error', () => {
      it('renders the error array', () => {
        const errorArray = ['This field is not valid'];

        const { getByText } = render(
          <FormErrors errors={errorArray} action='Modify' />
        );

        expect(
          getByText('Alguns erros impediram o(a) Modify.')
        ).toBeInTheDocument();
        expect(getByText('This field is not valid')).toBeInTheDocument();
      });
    });
  });
});
