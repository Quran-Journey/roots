import * as React from "react";
import {
    InputLabel,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
} from "@mui/material/";
import { getRoots } from "../utils";

export default function RootWordsDisplay(props) {
    let roots = props.roots;
    React.useEffect(() => {
        getRoots(props.setRoots, props.verse);
    }, []);

    let b = {};
    for (var r = 0; r < roots.length; r++) {
        let boxes = [];
        boxes.push(
            <Grid key={r} container pb={10}>
                <Grid item xs={4}>
                    <Typography sx={{ fontSize: 16 }}>{roots[r].word}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontSize: 16 }}>{roots[r].rootword} </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontSize: 16 }}>{roots[r].meanings} </Typography>
                </Grid>
            </Grid>
        );
        b[`box_${r}`] = { boxes };
    }

    let box_display = Object.keys(b).map((c) => {
        return b[c].boxes;
    });
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Card
                        align="center"
                        style={{ backgroundColor: "#77aa77" }}
                    >
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                component="div"
                                pb={1}
                            >
                                Verse
                            </Typography>
                            <Typography variant="h5" component="div" pb={2}>
                                {props.verse.text}
                            </Typography>
                            <Grid container pb={2}>
                                <Grid item xs={4}>
                                    <Typography variant="outline">
                                        Word
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="outline">
                                        Root
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="outline">
                                        Meanings
                                    </Typography>
                                </Grid>
                            </Grid>

                            {box_display}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
