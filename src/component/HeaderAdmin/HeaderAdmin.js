import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
export default function HeaderAdmin() {
  //create navigate
    const navigate = useNavigate();
   const handleLogout =()=> {
    localStorage.removeItem('tokenadmin');
    navigate('/login');
   }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin page
          </Typography>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" >
              <PersonIcon />
            </IconButton>
          <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}