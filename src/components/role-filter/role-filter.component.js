import useRoleFilter from 'hooks/use-role-filter';

function RoleFilter({ roles = [], children }) {
  const hasPermission = useRoleFilter(roles);

  if (!hasPermission) return null;

  return children;
}

export default RoleFilter;
