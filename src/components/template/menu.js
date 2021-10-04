import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';

export const menu = [
  { path: '/users', label: 'Usuários', icon: PeopleAltIcon, admin: true },
  { path: '/create-company', label: 'Parceiros', icon: StoreIcon, admin: true },
  { label: 'Faturas', icon: ReceiptIcon, admin: false },
];
