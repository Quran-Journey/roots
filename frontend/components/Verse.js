import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { apiGET } from "../utils";

export async function getVerseOptions(chapter, setVerses) {
    const getVerses = async () => {
        let verses_res = await apiGET(`/chapter/${chapter}`)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        if (verses_res && verses_res.data) {
            setVerses(verses_res.data.data);
            return verses_res.data.data;
        }
    };
    let verses = await getVerses();
    let verse_count = verses.length;
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
                    value={
                        Number.isInteger(props.verseNumber)
                            ? props.verseNumber + 1
                            : props.verseNumber
                    }
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
