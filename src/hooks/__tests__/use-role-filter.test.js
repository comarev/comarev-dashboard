import { renderHook } from '@testing-library/react-hooks';
import { createUser as mockCreateUser } from 'test/mocks/user';
import { pureWrapper } from 'test/test-utils';
import useRoleFilter from '../use-role-filter';

describe('useRoleFilter', () => {
  describe("when user does't have proper roles", () => {
    it('should return false', () => {
      const { result } = renderHook(() => useRoleFilter([]), {
        wrapper: ({ children }) => pureWrapper(children),
      });
      expect(result.current).toBe(false);
    });
  });

  describe('when user have proper roles', () => {
    it('should return true', () => {
      const { result } = renderHook(() => useRoleFilter(['admin']), {
        wrapper: ({ children }) =>
          pureWrapper(children, { user: mockCreateUser() }),
      });
      expect(result.current).toBe(true);
    });
  });
});
