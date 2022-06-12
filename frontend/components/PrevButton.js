import * as React from "react";
import { Button, Grid, IconButton } from "@mui/material/";
import { getRoots } from "../utils";

export default function NextButton(props) {
    const getPrevVerse = () => {
        if (props.verseNumber >= 1) {
            props.setVerseNumber(props.verseNumber - 1);
            // if (props.verseNumber != 1) {
            getRoots(props.setRoots, props.verses[props.verseNumber - 1]);
            // } else {
            //     getRoots(props.setRoots, props.verses[props.verseNumber - 1]);
            // }
        }
    };

    return (
        <div>
            <Button
                disabled={props.verseNumber + 1 == 1}
                type="submit"
                variant="contained"
                color="inherit"
                onClick={getPrevVerse}
            >
                <IconButton className=" fa-solid fa-angle-left"></IconButton>
                Prev Verse
            </Button>
        </div>
    );
}
