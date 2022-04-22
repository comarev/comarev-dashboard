import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createUser } from 'test/mocks/user';
import userReducer from 'store/modules/user/reducer';
import useRoleFilter from '../use-role-filter'

const store = configureStore({ reducer: { user: userReducer }, preloadedState: { user: createUser('customer') } });

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useRoleFilter', () => {
  describe('when user does\'t have proper roles', () => {
    it('should return false', () => {

      const { result } = renderHook(() => useRoleFilter(['admin']), { wrapper });
      
      expect(result.current).toBe(false);
    })
  })

  describe('when user have proper roles', () => {
    it('should return true', () => {

      const { result } = renderHook(() => useRoleFilter([]), { wrapper });
      
      expect(result.current).toBe(false);
    })
  })
})