import * as React from 'react';
import {Button, Grid, IconButton} from '@mui/material/';

export default function NextButton(props) { 

    const getPrevVerse = () => { props.setVerse(props.currentVerse - 1)};

    return (
        <div>
            <Button type="submit" variant="contained" color="inherit" onClick={getPrevVerse}> 
                <IconButton className=" fa-solid fa-angle-left"></IconButton>Previous Verse</Button> 
        </div>
    )
}




