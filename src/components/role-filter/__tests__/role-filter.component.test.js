import { useSelector } from 'react-redux';
import { userData } from '../../../test/mocks/user';
import RoleFilter from '../role-filter.component';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockElement = () => <div>some_content_for_element</div>;

describe('RoleComponent', () => {
  describe('when user doesn\'t have proper roles', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => userData);
    });

    it('should return null instead of given children element', () => {
      
      const componentUnderTest = RoleFilter({
        roles: ['admin'],
        children: mockElement,
      });

      expect(componentUnderTest).toBe(null);
    });
  });

  describe('when user has appropriate roles', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ ...userData, admin: true }));
    });

    it('should return the given element as children', () => {

      const componentUnderTest = RoleFilter({
        roles: ['admin'],
        children: mockElement,
      });

      expect(componentUnderTest).toEqual(mockElement);
    });
  });
});
