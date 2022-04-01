import {Typography, Grid, Box, BottomNavigationAction, AppBar, Toolbar, IconButton}  from '@mui/material';
import {Mail, DeveloperMode} from '@mui/icons-material';

export default function Navbar() {
    return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor: "white"}}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            <Box component="img" src="/qjLogo.png" alt="Quran Journey" sx={{height:100, width: 100}}></Box>
            </IconButton>
            
            <Typography variant="h5" component="div" color = "black">
                Quran Journey
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md:'flex' } }}>
            <IconButton><BottomNavigationAction icon={<Mail />} /></IconButton>
            <IconButton><BottomNavigationAction icon={<DeveloperMode />} /></IconButton>
            </Box>
            </Toolbar>
        </AppBar>
    </Box>
    </div>
  );
}