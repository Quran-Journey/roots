import Head from "next/Head";
import {Typography, Grid, Box}  from '@mui/material';
import ChapterInput from "../components/chapterInput.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
    <Head>
      <meta name="description" content="Roots of the arabic words in the quran."/>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar/>
    <Grid container spacing={2} pb = {5} align="center">
      <Grid item xs={12}>
        <Typography variant="h2" py = {5}>Learn the Linguistics of the Quran</Typography>
        <Typography variant="h5" >Select a Chapter and a Verse : </Typography>
      </Grid>
    </Grid>

    <Box display="flex" justifyContent="center">  
      <ChapterInput></ChapterInput>
    </Box>
    
    <Footer/>
    </div>
  );
}
