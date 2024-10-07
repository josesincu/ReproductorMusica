import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Typography } from '@mui/material';
import { Home, Search, LibraryMusic, Favorite, Radio, AccountCircle,AddBox } from '@mui/icons-material';


const Navbar = () => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h6" sx={{ padding: 2, color: '#9c27b0' }}>
        Sound Stream
      </Typography>
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon sx={{ color: '#ffffff' }}><Home /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/search">
          <ListItemIcon sx={{ color: '#ffffff' }}><Search /></ListItemIcon>
          <ListItemText primary="Buscar" />
        </ListItem>
        <ListItem button component={Link} to="/playlists">
          <ListItemIcon sx={{ color: '#ffffff' }}><LibraryMusic /></ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
        <ListItem button component={Link} to="/favorites">
          <ListItemIcon sx={{ color: '#ffffff' }}><Favorite /></ListItemIcon>
          <ListItemText primary="Favoritos" />
        </ListItem>
        <ListItem button component={Link} to="/radio">
          <ListItemIcon sx={{ color: '#ffffff' }}><Radio /></ListItemIcon>
          <ListItemText primary="Radio" />
        </ListItem>
        <ListItem button component={Link} to="/account">
          <ListItemIcon sx={{ color: '#ffffff' }}><AccountCircle /></ListItemIcon>
          <ListItemText primary="Cuenta" />
        </ListItem>
        {isAdmin && (
          <ListItem button component={Link} to="/add-song">
            <ListItemIcon sx={{ color: '#ffffff' }}><AddBox /></ListItemIcon>
            <ListItemText primary="Agregar Canción" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Navbar;
