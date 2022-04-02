import {Typography, Grid, Card, Paper, Button, Container, BottomNavigation, Box, BottomNavigationAction, AppBar, Toolbar, IconButton}  from '@mui/material';
import {Mail, DeveloperMode} from '@mui/icons-material';

export default function Footer() {
    return (
    <div>
    <Box position="relative" align="center" sx = {{pt : 10 }} style={{width:"100%", bottom: 0}}>
        <Grid align="center">
        <Typography> Powered by Quran Journey </Typography>   
        </Grid>
    </Box>
    </div>
  );
}
