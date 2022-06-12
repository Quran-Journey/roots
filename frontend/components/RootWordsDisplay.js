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
import { apiGET } from "../utils";

export default function RootWordsDisplay(props) {
    const [roots, setRoots] = React.useState([]);

    React.useEffect(() => {
        getRoots();
    }, []);

    const getRoots = async () => {
        let chapters_res = await apiGET(`/verse/${props.verse.index}`)
            .then((response) => {
                console.log("Fetched chapters");
                console.log(response);
                return response;
            })
            .catch((err) => {
                return err;
            });
        if (chapters_res && chapters_res.data) {
            console.log(chapters_res.data.data);
            setRoots(chapters_res.data.data);
        }
    };

    let b = {};
    for (var r = 0; r < roots.length; r++) {
        let boxes = [];
        boxes.push(
            <Grid container pb={10}>
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
                        style={{ backgroundColor: "lightgrey" }}
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
                                        Root of Word
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
