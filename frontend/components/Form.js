import * as React from "react";
import { Box, Grid } from "@mui/material/";
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

    return (
        <div className="Form">
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

            {verses[verseNumber] ? (
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
                        <NextButton
                            setVerseNumber={setVerseNumber}
                            numberOfVerses={verses.length}
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
                        <PrevButton
                            setVerseNumber={setVerseNumber}
                            verseNumber={verseNumber}
                            verses={verses}
                            setRoots={setRoots}
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
