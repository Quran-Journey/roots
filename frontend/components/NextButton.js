import * as React from "react";
import {
    InputLabel,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
} from "@mui/material/";
import { getNumberofVerses } from ".././mockAPI";
import { getRoots } from "../utils";

export default function NextButton(props) {
    const getNextVerse = () => {
        if (props.verseNumber < props.numberOfVerses) {
            props.setVerseNumber(props.verseNumber + 1);
            getRoots(props.setRoots, props.verses[props.verseNumber + 1]);
        }
    };

    return (
        <div>
            <Button
                disabled={props.verseNumber >= props.numberOfVerses - 1}
                type="submit"
                variant="contained"
                color="inherit"
                onClick={getNextVerse}
            >
                Next Verse
                <IconButton className=" fa-solid fa-angle-right"></IconButton>
            </Button>
        </div>
    );
}
