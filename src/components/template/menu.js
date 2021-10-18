import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';


export const menu = [
  { path: '/users', label: 'Usuários', icon: PeopleAltIcon, admin: true },
  { path: '/companies', label: 'Empresas', icon: SupervisorAccountOutlinedIcon, admin: true },
  { label: 'Faturas', icon: ReceiptIcon, admin: false },
];
