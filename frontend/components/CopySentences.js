import * as React from "react";
import Button from "@mui/material/Button";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
            {props.copyAll ? <CopyAllIcon></CopyAllIcon> : <ContentCopyIcon></ContentCopyIcon>}
        </Button>
    );
}
