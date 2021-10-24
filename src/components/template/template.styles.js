import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  content: {
    width: `calc(100% - ${240}px)`,
    marginLeft: '246px',
    padding: '10px'
  }
}));

export const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px;
`;
