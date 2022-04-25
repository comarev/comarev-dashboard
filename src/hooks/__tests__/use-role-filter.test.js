import { renderHook } from '@testing-library/react-hooks';
import { createUser as mockCreateUser } from 'test/mocks/user';
import useRoleFilter from '../use-role-filter'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () =>  mockCreateUser(),
}));

describe('useRoleFilter', () => {
  describe('when user does\'t have proper roles', () => {
    it('should return false', () => {
      const { result } = renderHook(() => useRoleFilter([]));
      expect(result.current).toBe(false);
    })
  })

  describe('when user have proper roles', () => {
    it('should return true', () => {
      const { result } = renderHook(() => useRoleFilter(['admin']));
      expect(result.current).toBe(true);
    })
  })
})