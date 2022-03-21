import Dashboard from '../dashboard.component';
import wrapper from '../../../test/test-utils';
import { fireEvent } from '@testing-library/react';
import { createUser } from '../../../test/mocks/user';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const setup = () => {
  const rendered = wrapper(Dashboard);
  const { getByLabelText } = rendered;

  const menuButton = getByLabelText('menu');

  fireEvent.click(menuButton);

  return rendered;
};

describe('Dashboard Sidebar', () => {
  describe('when admin', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ ...createUser('admin')}));
    });

    it('shows the sidebar with all links', () => {
      const { queryByText } = setup();

      expect(queryByText('Início')).toBeInTheDocument();
      expect(queryByText('Usuários')).toBeInTheDocument();
      expect(queryByText('Empresas')).toBeInTheDocument();
      expect(queryByText('Faturas')).toBeInTheDocument();
      expect(queryByText('Obter QR CODE')).toBeInTheDocument();
    });
  });

  describe('when customer user', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ ...createUser('customer') }));
    });

    it('shows only customer links', () => {
      const { queryByText } = setup();

      expect(queryByText('Início')).toBeInTheDocument();
      expect(queryByText('Faturas')).toBeInTheDocument();
      expect(queryByText('Usuários')).toBeNull();
      expect(queryByText('Empresas')).toBeNull();
      expect(queryByText('Obter QR CODE')).toBeNull();
    });
  });
});
