import React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={'inherit'}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor={'left'} open={isOpen} onClose={() => setIsOpen(false)}>
        <List>
          {['Home', 'Students', 'Third page'].map((text) => (
            <ListItem key={text} onClick={() => setIsOpen(false)}>
              <Link to={text === 'Home' ? '/' : '/students'} className="link">
                <ListItemButton sx={{ width: '100%' }}>
                  <ListItemIcon>
                    {text === 'Home' ? <HomeIcon /> : ''}
                    {text === 'Students' ? <PeopleIcon /> : ''}
                    {text === 'Third page' ? <InfoIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
