import * as React from "react";
import { getVerseOptions } from "./Verse";
import { FormHelperText, FormControl, Select, MenuItem } from "@mui/material/";
import { InputLabel } from "@mui/material/";
import { getChapter } from ".././mockAPI";

export default function Chapter(props) {
    const handleChapterChange = (event) => {
        props.setVerse === "";
        props.setVerseOptions === "";
        props.setChapter(event.target.value);
        let ver = getVerseOptions(event.target.value);
        let verse_options = Object.keys(ver).map((c) => {
            return ver[c].verse_list;
        });
        props.setVerseOptions(verse_options);
    };

    let chapt = {};
    for (var i = 1; i <= 3; i++) {
        //replace 3 by 114 when API completed
        let name = getChapter(i).name;
        let chapt_list = [];
        chapt_list.push(
            <MenuItem key={i} value={i}>
                Chapter {i} : {name}
            </MenuItem>
        );
        chapt[`chapter_${i}`] = { chapt_list };
    }
    let chapter_options = Object.keys(chapt).map((c) => {
        return chapt[c].chapt_list;
    });

    return (
        <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="chapter-select-required-label">
                    Chapter
                </InputLabel>
                <Select
                    labelId="chapter-select-required-label"
                    id="chapter-select-required"
                    value={props.currentChapter}
                    label="Chapter"
                    onChange={handleChapterChange}
                >
                    {chapter_options}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    );
}
