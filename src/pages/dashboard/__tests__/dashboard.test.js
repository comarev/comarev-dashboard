import Dashboard from '../dashboard.component';
import wrapper from '../../../test/test-utils';
import { fireEvent } from '@testing-library/react';
import { userData } from '../../../test/mocks/user';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const setup = () => {
  const rendered = wrapper(Dashboard);
  const { getByTestId } = rendered;

  const menuButton = getByTestId('hamburger-menu');

  fireEvent.click(menuButton);

  return rendered;
};

describe('Dashboard Sidebar', () => {
  describe('when admin', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ ...userData, admin: true }));
    });

    it('show the sidebar with all links', () => {
      const { queryByText } = setup();

      queryByText('Usuários');
      queryByText('Parceiros');
      queryByText('Faturas');
    });
  });

  describe('when normal user', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => userData);
    });

    it('show only not admin links', () => {
      const { queryByText } = setup();
      const userMenu = queryByText('Usuários');

      queryByText('Faturas');
      expect(userMenu).toBeNull();
    });
  });
});
