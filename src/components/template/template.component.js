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
import { useSelector } from 'react-redux';
import { StyledMenuIcon, useStyles } from './template.styles';
import { useHeader } from './use-header';
import { menu } from './menu';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';

const Template = ({ children }) => {
  const [state, setState] = useState({
    left: false,
    open: true,
  });

  const history = useHistory();

  const user = useSelector((state) => state.user);

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
          .filter((item) => user.admin || !item.admin)
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
    <>
      <div className={classes.root}>
        <AppBar
          className={state.open ? classes.appBar : classes.appBarShift}
          position='static'
        >
          <Toolbar>
            <IconButton color='inherit' onClick={toggleDrawer}>
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
          {children}
        </main>
      </div>
    </>
  );
};

export default Template;
