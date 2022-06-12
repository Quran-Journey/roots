import * as React from "react";
import { Button, Box, Grid } from "@mui/material/";
import RootWordsDisplay from "./RootWordsDisplay";
import Chapter from "./Chapter";
import Verse from "./Verse";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

export default function Form() {
    const [currentChapter, setChapter] = React.useState("");
    const [currentVerse, setVerse] = React.useState("");
    const [verseOptions, setVerseOptions] = React.useState("");
    const [chapters, setChapters] = React.useState([]);
    const [verses, setVerses] = React.useState([]);

    const handleVerseChange = (event) => {
        let index = event.target.value;
        setVerse(verses[index].indexid);
    };

    React.useEffect(() => {
        currentChapter === "" ? setVerse("") : handleVerseChange;
    });

    //Find Root Button Action
    const [showRootWords, setShowRootWords] = React.useState(false);
    const onClickFindRoot = () => {
        setShowRootWords(true);
    };

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Chapter
                    currentChapter={currentChapter}
                    chapters={chapters}
                    setVerse={setVerse}
                    setChapter={setChapter}
                    setChapters={setChapters}
                    setVerses={setVerses}
                    setVerseOptions={setVerseOptions}
                />

                <Verse
                    currentChapter={currentChapter}
                    currentVerse={currentVerse}
                    setVerse={setVerse}
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

            {showRootWords ? (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    display="inline-flex"
                >
                    <Grid item>
                        <PrevButton
                            setVerse={setVerse}
                            currentVerse={currentVerse}
                        />
                    </Grid>

                    <Grid item>
                        <RootWordsDisplay verse={verses[currentVerse]} />
                    </Grid>

                    <Grid item>
                        <NextButton
                            setVerse={setVerse}
                            numberOfVerses={verses.length}
                            currentVerse={currentVerse}
                        />
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}
