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
        let chapters_res = await apiGET(`/verse/${props.verse}`)
            .then((response) => {
                console.log("Fetched chapters");
                console.log(response);
                return response;
            })
            .catch((err) => {
                return err;
            });
        if (chapters_res && chapters_res.data) {
            setRoots(chapters_res.data.data);
        }
    };

    let b = {};
    for (const key in roots) {
        let boxes = [];
        boxes.push(
            <Grid container pb={2}>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 16 }}>{key}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 16 }}>
                        {root_words_arr[key]}{" "}
                    </Typography>
                </Grid>
            </Grid>
        );
        b[`box_${key}`] = { boxes };
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
                                {props.verse}
                            </Typography>
                            <Grid container pb={2}>
                                <Grid item xs={6}>
                                    <Typography variant="outline">
                                        Word
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="outline">
                                        Root of Word
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
