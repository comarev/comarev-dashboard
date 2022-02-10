import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import HomeIcon from '@material-ui/icons/Home';

export const menu = [
  { path: '/', label: 'Início', icon: HomeIcon, roles: [] },
  {
    path: '/users',
    label: 'Usuários',
    icon: PeopleAltIcon,
    roles: ['admin'],
  },
  {
    path: '/companies',
    label: 'Empresas',
    icon: SupervisorAccountOutlinedIcon,
    roles: ['admin', 'manager'],
  },
  {
    label: 'Faturas',
    path: '/invoices',
    icon: ReceiptIcon,
    roles: ['admin', 'customer'],
  },
];
