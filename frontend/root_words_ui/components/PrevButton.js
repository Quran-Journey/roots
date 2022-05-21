import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid, IconButton} from '@mui/material/';

export default function NextButton(props) { 

    const getPrevVerse = () => { setVerse(currentVerse - 1)};

    return (
        <div>
            <Grid item xs={3}><Button type="submit" variant="contained" color="inherit" onClick={getPrevVerse}> 
                <IconButton className=" fa-solid fa-angle-left"></IconButton>Previous Verse</Button>
            </Grid>
        </div>
    )
}




