import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid, IconButton} from '@mui/material/';
import RootWordsDisplay from "./RootWordsDisplay";
import Chapter from "./Chapter";
import Verse from "./Verse";


export default function Form() { 
  const [currentChapter, setChapter] = React.useState('')
  const [currentVerse, setVerse] = React.useState('');
  const [verseOptions, setVerseOptions] = React.useState('');
  
  const handleVerseChange = (event) => {setVerse(event.target.value)};
  React.useEffect(() => {(currentChapter === '') ? setVerse('') : handleVerseChange})


  //Find Root Button Action
  const [showRootWords, setShowRootWords] = React.useState(false)
  const onClickFindRoot = () => {setShowRootWords(true)}

  //Prev & Next Button Action 
  const getPrevVerse = () => { setVerse(currentVerse - 1)};
  const getNextVerse = () => { setVerse(currentVerse + 1)};

  return (
  <div>
    <Box display="flex" justifyContent="center">  

    <Chapter currentChapter={currentChapter} setChapter={setChapter} setVerseOptions={setVerseOptions} verseOptions={verseOptions}/>

    <Verse currentChapter={currentChapter} currentVerse={currentVerse} setVerse={setVerse} verseOptions={verseOptions} handleVerseChange={handleVerseChange}/>

    </Box>

    <Box display="flex" justifyContent="center" pt = {5} pb={3}>
    <Button type="submit" variant="contained" color="inherit" onClick={onClickFindRoot}> 
    Find Root</Button>
    </Box>

    <Grid container direction="row" justifyContent="center" alignItems="center" display="inline-flex">

      <Grid item xs={3}><Button type="submit" variant="contained" color="inherit" onClick={getPrevVerse}> 
      <IconButton className=" fa-solid fa-angle-left"></IconButton>Previous Verse</Button>
      </Grid>

      <Grid item xs={6} className="roots-display">{ showRootWords ? <RootWordsDisplay currentChapter={currentChapter} currentVerse={currentVerse} /> : null }</Grid> 

      <Grid item xs={3}><Button type="submit" variant="contained" color="inherit" onClick={getNextVerse}> 
      Next Verse<IconButton className=" fa-solid fa-angle-right"></IconButton></Button>
      </Grid>

    </Grid>
    

  </div>

  );
}
  
