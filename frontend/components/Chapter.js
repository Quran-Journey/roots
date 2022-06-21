import * as React from "react";
import { getVerseOptions } from "./Verse";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { apiGET } from "../utils";

export default function Chapter(props) {

    const handleChapterChange = async (event) => {
        props.setChapter(event.target.value);
        props.setVerseNumber("");
        let ver = await getVerseOptions(event.target.value, props.setVerses);
        let verse_options = Object.keys(ver).map((c) => {
            return ver[c].verse_list;
        });
        props.setVerseOptions(verse_options);
    };

    React.useEffect(() => {
        getChapters();
    }, []);

    const getChapters = async () => {
        let chapters_res = await apiGET("/chapters")
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        if (chapters_res && chapters_res.data) {
            props.setChapters(chapters_res.data.data);
        }
    };

    let chapt = {};
    for (var i = 1; i < props.chapters.length + 1; i++) {
        let name = props.chapters[i - 1].sura_name;
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
