import * as React from "react";
import { Button } from "@mui/material/";
import { CopyAll } from "@mui/icons-material";

export default function CopySentences(props) {
    const CopySentences = async () => {
        // Steps on how to move things to a clipboard:
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        console.log("Potato stuff amazing");
        return;
        let v;
        Number.isInteger(verse) ? (v = verse) : (v = verse.index);
        let sentences_res = await apiGET(`/verse/${v}/sentence`)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        if (roots_res && roots_res.data) {
            setRoots(roots_res.data.data);
        }
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
            <CopyAll></CopyAll>
        </Button>
    );
}
