import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid, IconButton} from '@mui/material/';

export default function NextButton(props) { 

    const getNextVerse = () => {props.setVerse(props.currentVerse + 1)};

    return (
        <div>
            <Button type="submit" variant="contained" color="inherit" onClick={getNextVerse}> 
                Next Verse<IconButton className=" fa-solid fa-angle-right"></IconButton>
            </Button>
        </div>
    )
}