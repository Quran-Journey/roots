import * as React from "react";
import { FormHelperText, FormControl, Select, MenuItem } from "@mui/material/";
import {
    InputLabel,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
} from "@mui/material/";
import {
    getChapter,
    getNumberofVerses,
    getChapterVerses,
    getVerse,
    getRootWords,
} from ".././mockAPI";

export function getVerseOptions(chapter) {
    let verses = {};
    let verse_count = getNumberofVerses(chapter);
    for (var i = 1; i <= verse_count; i++) {
        let verse_list = [];
        verse_list.push(
            <MenuItem key={i} value={i}>
                Verse {i}
            </MenuItem>
        );
        verses[`verse_${i}`] = { verse_list };
    }
    return verses;
}

export default function Verse(props) {
    return (
        <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="verse-select-required-label">Verse</InputLabel>
                <Select
                    labelId="verse-select-required-label"
                    id="verse-select-required"
                    value={props.currentVerse}
                    label="Verse"
                    onChange={props.handleVerseChange}
                >
                    {props.verseOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    );
}
