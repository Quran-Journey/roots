import * as React from 'react';
import {InputLabel, Button, Typography, Box, Card, CardContent, Grid} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import RootWordsDisplay from "./RootWordsDisplay";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getChapters, getNumberofVerses, getChapterVerses, getVerse, getRootWords, getChapterName} from ".././mockAPI";


export default function Form() {
  //---------- -----------------Displaying Chapter Options -----------------------//
  let chapt = {};
  for (var i = 1; i <= 3; i++) {  //replace 3 by 114 when API completed
      let name = getChapterName(i)
      let chapt_list = [];
      chapt_list.push(<MenuItem key={i} value={i}>Chapter {i} : {name}</MenuItem>);  
      chapt[`chapter_${i}`] = {chapt_list};
  }

  let chapter_options = Object.keys(chapt).map((c) => { return chapt[c].chapt_list; });
  
  //----------------------------Displaying Verse Options -----------------------// 
  
  let verses = {};
  let verse_count = getNumberofVerses(2)   ///testing using: chapter 2 --> FIGURE OUT 
  for (var i = 1; i <= verse_count; i++){
     let verse_list = [];
     verse_list.push(<MenuItem key={i} value={i}>Verse {i}</MenuItem>); 
     verses[`verse_${i}`] = {verse_list};
  }
     let verse_options = Object.keys(verses).map((c) => { return verses[c].verse_list; }); 

  //----------------------------------------------------------------------------//

  const [currentChapter, setChapter] = React.useState('');
  const [currentVerse, setVerse] = React.useState('');


  const handleChapterChange = (event) => {
    setChapter(event.target.value);
  };

  // change this to be dependent on chapter change
  const handleVerseChange = (event) => {
    setVerse(event.target.value)
  };
   
  //----------------------------Find Root Button Action---------------------------------------//
  const [showRootWords, setShowRootWords] = React.useState(false)
  const onClickFindRoot = () => setShowRootWords(true)
  //------------------------------------------------------------------------------------------//

    return (
    <div>
      <Box display="flex" justifyContent="center">  
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Chapter</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={currentChapter}
          label="Chapter"
          onChange={handleChapterChange}
        >
          {chapter_options}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Verse</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={currentVerse}
          label="Verse"
          onChange={handleVerseChange}>
          {verse_options}
        </Select>
        <FormHelperText>Required</FormHelperText>

      </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" pt = {5} pb={3}>
      <Button type="submit" variant="contained" color="inherit" onClick={onClickFindRoot}> 
      Find Root</Button>
      </Box>

      { showRootWords ? <RootWordsDisplay /> : null }

    </div>

  );
}
  
