import * as React from "react";
import { Button } from "@mui/material/";
import { CopyAll, ContentCopy } from "@mui/icons-material";
import { copy } from "../utils";

export default function CopySentences(props) {
    const CopySentences = () => {
        let text = "";
        for (let root of props.roots) {
            text = `${root.sentence}\n${text}`;
        }
        copy(text);
    };

    return (
        <Button
            size="small"
            edge="start"
            color="primary"
            style={{
                height: "100%",
                width: "100%",
                background: "#eeeeee",
            }}
            onClick={CopySentences}
        >
            {props.copyAll ? <CopyAll></CopyAll> : <ContentCopy></ContentCopy>}
        </Button>
    );
}
