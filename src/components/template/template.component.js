import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { useSelector } from 'react-redux';
import { StyledMenuIcon, useStyles } from './template.styles';
import { useHeader } from './use-header';
import { menu } from './menu';
import { useHistory } from 'react-router-dom';
import { Divider, Box, Paper } from '@material-ui/core';
import { USER_ROLES } from 'utils/constants';
import { Fab } from '@material-ui/core';
import RoleFilter from 'components/role-filter/role-filter.component';
import { useMediaQuery } from 'react-responsive';
import AppProvider from 'providers/app-provider';
import ModalProvider from 'providers/custom-modal-provider';

const Template = ({ children, title = '', rightActions = null }) => {
  const matches = useMediaQuery({ query: '(max-width: 600px)' });
  const [state, setState] = useState({
    left: false,
    open: matches ? false : true,
  });

  const history = useHistory();

  const user = useSelector((state) => state.user);
  const userRoles = USER_ROLES.filter((role) => user[role]);

  const classes = useStyles();

  const { handleMenu, anchorEl, open, handleClose, handleSignOut } =
    useHeader();

  const toggleDrawer = () => {
    setState({ ...state, open: !state.open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
    >
      <List>
        {menu
          .filter((item) => {
            const roles = item.roles;
            const hasPermission =
              roles.length === 0 ||
              roles.some((role) => userRoles.includes(role));

            return hasPermission;
          })
          .map((item) => {
            const Icon = item.icon;

            return (
              <ListItem
                button
                key={item.label}
                onClick={() => history.push(item.path)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
      </List>
    </div>
  );

  return (
    <ModalProvider>
      <AppProvider>
        <div className={classes.root}>
          <AppBar
            className={state.open ? classes.appBar : classes.appBarShift}
            position='static'
          >
            <Toolbar>
              <IconButton
                color='inherit'
                onClick={toggleDrawer}
                aria-label='menu'
              >
                <StyledMenuIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Olá, {user.full_name}
              </Typography>
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Meu perfil</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sair</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant='persistent'
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor='left'
            open={state.open}
          >
            <div className={classes.toolbar} />
            <Divider />
            {list('left')}
            <Divider />
          </Drawer>
          <main className={state.open ? classes.content : classes.contentShift}>
            <div className={classes.toolbar} />
            <Paper>
              <Box padding={3}>
                {(title || rightActions) && (
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={3}
                  >
                    <Typography variant='h5'>{title}</Typography>
                    {rightActions || null}
                  </Box>
                )}
                {children}
              </Box>
            </Paper>
            <RoleFilter roles={['customer']}>
              <Fab
                style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
                color='primary'
                aria-label='scan'
                onClick={() => history.push('/scanner')}
              >
                <CameraIcon />
              </Fab>
            </RoleFilter>
          </main>
        </div>
      </AppProvider>
    </ModalProvider>
  );
};

export default Template;
