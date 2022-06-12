import * as React from "react";
import { Button, Box, Grid } from "@mui/material/";
import RootWordsDisplay from "./RootWordsDisplay";
import Chapter from "./Chapter";
import Verse from "./Verse";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { getRoots } from "../utils";

export default function Form() {
    const [currentChapter, setChapter] = React.useState("");
    const [verseNumber, setVerseNumber] = React.useState("");
    const [verseOptions, setVerseOptions] = React.useState("");
    const [chapters, setChapters] = React.useState([]);
    const [verses, setVerses] = React.useState([]);
    const [roots, setRoots] = React.useState([]);

    const handleVerseChange = (event) => {
        let index = event.target.value;
        console.log("Current Verse:");
        console.log(index);
        console.log("Verses:");
        console.log(verses);

        setVerseNumber(index - 1);
        getRoots(setRoots, index);
    };

    React.useEffect(() => {
        currentChapter === "" ? setVerseNumber("") : handleVerseChange;
    });

    //Find Root Button Action
    const [showRootWords, setShowRootWords] = React.useState(false);
    const onClickFindRoot = () => {
        if (verseNumber != "") {
            setShowRootWords(true);
            console.log(verses[verseNumber].index);
            getRoots(setRoots, verses[verseNumber]);
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Chapter
                    currentChapter={currentChapter}
                    chapters={chapters}
                    setVerseNumber={setVerseNumber}
                    setChapter={setChapter}
                    setChapters={setChapters}
                    setVerses={setVerses}
                    setVerseOptions={setVerseOptions}
                />

                <Verse
                    currentChapter={currentChapter}
                    verseNumber={verseNumber}
                    setVerseNumber={setVerseNumber}
                    verseOptions={verseOptions}
                    handleVerseChange={handleVerseChange}
                />
            </Box>

            <Box display="flex" justifyContent="center" pt={5} pb={3}>
                <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={onClickFindRoot}
                >
                    Find Root
                </Button>
            </Box>

            {showRootWords && verses[verseNumber] ? (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    display="inline-flex"
                >
                    <Grid item>
                        <PrevButton
                            setVerseNumber={setVerseNumber}
                            verseNumber={verseNumber}
                            verses={verses}
                            setRoots={setRoots}
                        />
                    </Grid>

                    <Grid item>
                        <RootWordsDisplay
                            verse={verses[verseNumber]}
                            setRoots={setRoots}
                            roots={roots}
                        />
                    </Grid>

                    <Grid item>
                        <NextButton
                            setVerseNumber={setVerseNumber}
                            numberOfVerses={verses.length}
                            verseNumber={verseNumber}
                            verses={verses}
                            setRoots={setRoots}
                        />
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}
