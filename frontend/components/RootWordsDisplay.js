import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CopySentences from "./CopySentences";
import { getRoots } from "../utils";
import styles from "./rootWord.module.css";

export default function RootWordsDisplay(props) {
    let roots = props.roots;
    React.useEffect(() => {
        getRoots(props.setRoots, props.verse);
    }, []);

    let b = {};
    for (var r = 0; r < roots.length; r++) {
        let boxes = [];
        boxes.push(
            <div>
                <Grid key={r} className={styles.roots} container pb={1}>
                    <Grid item xs={1} className={styles.root_grid_items}>
                        <Typography
                            className={styles.stuff}
                            sx={{ fontSize: 25 }}
                        >
                            {roots[r].word}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} className={styles.root_grid_items}>
                        <Typography
                            className={styles.stuff}
                            sx={{ fontSize: 25 }}
                        >
                            {roots[r].rootword}{" "}
                        </Typography>
                    </Grid>
                    <Grid item md={5} className={styles.root_grid_items}>
                        <Typography sx={{ fontSize: 20 }}>
                            {roots[r].meanings}{" "}
                        </Typography>
                    </Grid>
                    <Grid item md={1}>
                        {/* Note that we're passing in roots[r].sentence in a list */}
                        <CopySentences
                            roots={[roots[r]]}
                        ></CopySentences>
                    </Grid>
                </Grid>
            </div>
        );
        b[`box_${r}`] = { boxes };
    }

    let box_display = Object.keys(b).map((c) => {
        return b[c].boxes;
    });
    return (
        <div>
            <Grid container direction="column">
                <Grid item className={styles.roots}>
                    <Typography variant="h5" component="div" pb={1}>
                        {props.verse.text}
                    </Typography>
                    <Grid container pb={1} className={styles.roots}>
                        <Grid item xs={1} className={styles.root_grid_items}>
                            <Typography variant="outline">Word</Typography>
                        </Grid>
                        <Grid item xs={1} className={styles.root_grid_items}>
                            <Typography variant="outline">Root</Typography>
                        </Grid>
                        <Grid item xs={5} className={styles.root_grid_items}>
                            <Typography variant="outline">Meanings</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <CopySentences
                                copyAll={true}
                                roots={props.roots}
                            ></CopySentences>
                        </Grid>
                    </Grid>
                    {box_display}
                </Grid>
            </Grid>
        </div>
    );
}
