import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../utils/constants';

function FilterComponent({ roles = [], children }) {
  const user = useSelector((state) => state.user);
  const userRoles = USER_ROLES.filter((role) => user[role]);

  const hasPermission = roles.some((role) => userRoles.includes(role));

  if (!hasPermission) return null;

  return children;
}

export default FilterComponent;
