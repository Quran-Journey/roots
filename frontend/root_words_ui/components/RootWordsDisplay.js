import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid} from '@mui/material/';
import { getChapters, getNumberofVerses, getChapterVerses, getVerse, getRootWords, getChapterName} from ".././mockAPI";

export default function RootWordsDisplay(props) {
    let root_words_arr = getRootWords(props.currentChapter, props.currentVerse)    
    let b = {}
    for (const key in root_words_arr) {
        let boxes = [];
        boxes.push(
        <Grid container>
        <Grid item xs={6} ><Typography variant="h6">{key} </Typography></Grid>
        <Grid item xs={6}><Typography variant="h6">{root_words_arr[key]} </Typography></Grid>
        </Grid>);
        b[`box_${key}`] = {boxes};
    }

    let box_display = Object.keys(b).map((c) => { return b[c].boxes; }); 

    return (
    <div>
    <Grid container direction="column">
      <Grid item>  
        <Card align= "center" style={{backgroundColor: "lightgrey"}}>
          <CardContent>
            <Typography sx={{ fontSize: 22}} color="text.secondary" gutterBottom> Root Words </Typography>
            <Typography variant="h6" component="div">Verse:</Typography>
            <Typography variant="h4" component="div">{getVerse(props.currentChapter, props.currentVerse)}</Typography>
            <Grid container>
            <Grid item xs={6} ><Typography variant="h6">Word</Typography></Grid>
            <Grid item xs={6}><Typography variant="h6">Root of Word</Typography></Grid>
            </Grid>

            {box_display}
           
          </CardContent>
        </Card>
        </Grid>
    </Grid>
    </div>
    );
}
