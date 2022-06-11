import { Typography, Grid } from "@mui/material";

export default function Footer() {
    return (
        <div>
            <Grid
                container
                style={{
                    bottom: 0,
                    position: "static",
                    textAlign: "center",
                    paddingBottom: 5,
                }}
            >
                <Grid item xs={12}>
                    <Typography> Powered by Quran Journey </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
