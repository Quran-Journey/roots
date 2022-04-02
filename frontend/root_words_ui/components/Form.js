import * as React from 'react';
import {InputLabel, Button, Box} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Form() {
  const [chapter, setChapter] = React.useState('');
  const [verse, setVerse] = React.useState('');

  const handleChapterChange = (event) => {
    setChapter(event.target.value);
  };

  const handleVerseChange = (event) => {
    setVerse(event.target.value)
  };

    return (
    <div>
      <Box display="flex" justifyContent="center">  
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Chapter</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={chapter}
          label="Chapter"
          onChange={handleChapterChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Verse</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={verse}
          label="Verse"
          onChange={handleVerseChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>

      </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" pt = {5}>
      <Button type="submit" variant="contained" color="inherit">Find Root</Button>
      </Box>
    </div>

  );
}
