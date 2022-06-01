import wrapper from 'test/test-utils';
import { createUser } from 'test/mocks/user';
import RoleFilter from '../role-filter.component';

const setup = (roles = []) => {
  return () => (
    <RoleFilter roles={roles}>
      <div>Hello world</div>;
    </RoleFilter>
  );
};

describe('RoleComponent', () => {
  describe("when user doesn't have proper roles", () => {
    it('should not be present', () => {
      const RoleFilterWrapper = setup(['admin']);

      const { queryByText } = wrapper(<RoleFilterWrapper />);

      expect(queryByText('Hello world')).not.toBeInTheDocument();
    });
  });

  describe('when user has appropriate roles', () => {
    it('should return the given element as children', () => {
      const RoleFilterWrapper = setup(['admin']);

      const { queryByText } = wrapper(<RoleFilterWrapper />, {
        preloadedState: { user: createUser() },
      });

      expect(queryByText('Hello world')).toBeInTheDocument();
    });
  });
});
