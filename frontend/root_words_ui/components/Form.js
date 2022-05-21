import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid, IconButton} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import RootWordsDisplay from "./RootWordsDisplay";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getChapter, getNumberofVerses, getChapterVerses, getVerse, getRootWords} from ".././mockAPI";


export default function Form() {
  //---------- -----------------Displaying Chapter Options -----------------------//
  let chapt = {};
  for (var i = 1; i <= 3; i++) {  //replace 3 by 114 when API completed
      let name = getChapter(i).name 
      let chapt_list = [];
      chapt_list.push(<MenuItem key={i} value={i}>Chapter {i} : {name}</MenuItem>);  
      chapt[`chapter_${i}`] = {chapt_list};
  }

  let chapter_options = Object.keys(chapt).map((c) => { return chapt[c].chapt_list; });
  
  //----------------------------Displaying Verse Options -----------------------// 
  function getVerseOptions(chapter){
    let verses = {};
    let verse_count = getNumberofVerses(chapter)   ///testing using: chapter 2 --> FIGURE OUT 
    for (var i = 1; i <= verse_count; i++){
      let verse_list = [];
      verse_list.push(<MenuItem key={i} value={i}>Verse {i}</MenuItem>); 
      verses[`verse_${i}`] = {verse_list}; 
    }
    return verses
  }


  //----------------------------------------------------------------------------//

  const [currentChapter, setChapter] = React.useState('');
  const [currentVerse, setVerse] = React.useState('');
  const [verseOptions, setVerseOptions] = React.useState('');

  const handleChapterChange = (event) => {
    setChapter(event.target.value);
    let ver = getVerseOptions(event.target.value);
    let verse_options = Object.keys(ver).map((c) => { return ver[c].verse_list; });
    setVerseOptions(verse_options)
  };

  const handleVerseChange = (event) => {
    setVerse(event.target.value)
  };

  React.useEffect(() => {
    (currentChapter === '') ? setVerse('') : handleVerseChange})

  //----------------------------Find Root Button Action---------------------------------------//
  const [showRootWords, setShowRootWords] = React.useState(false)
  const onClickFindRoot = () => {setShowRootWords(true)}

  React.useEffect(() => {
    ((currentChapter === '') || (currentVerse === '')) ? setShowRootWords(false) : onClickFindRoot})
  //----------------------------Prev/Next Button Action---------------------------------------//
  const getPrevVerse = () => {
    setVerse(currentVerse - 1)
  };

  const getNextVerse = () => {
    setVerse(currentVerse + 1)
  };

  //------------------------------------------------------------------------------------------//

    return (
    <div>
      <Box display="flex" justifyContent="center">  
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="chapter-select-required-label">Chapter</InputLabel>
        <Select
          labelId="chapter-select-required-label"
          id="chapter-select-required"
          value={currentChapter}
          label="Chapter"
          onChange={handleChapterChange}
        >
          {chapter_options}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="verse-select-required-label">Verse</InputLabel>
        <Select
          labelId="verse-select-required-label"
          id="verse-select-required"
          value={currentVerse}
          label="Verse"
          onChange={handleVerseChange}>
          {verseOptions}
        </Select>
        <FormHelperText>Required</FormHelperText>

      </FormControl>
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
  
