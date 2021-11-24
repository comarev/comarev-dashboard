import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  appBarShift: {
    width: '100%',
    marginLeft: 0,
    },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentShift: {
    width: '100%',
    marginLeft: 0,
    padding: theme.spacing(2),
  },
  // necessary for content to be below app bar
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
  },
}));

export const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px;
`;

export const StyledMenuIcon = styled(MenuIcon)`
 && {
  .MuiIconButton-root {color: ${({theme}) => theme.palette.primaryContext}}
}
`
