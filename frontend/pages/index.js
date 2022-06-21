import Head from "next/head";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Form from "../components/Form";

export default function Home() {
    return (
        <div>
            <Head>
                <meta
                    name="description"
                    content="Roots of the arabic words in the quran."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <Grid container spacing={2} pb={5} align="center">
                <Grid item xs={12}>
                    <Typography variant="h2" py={5}>
                        Arabic Root Words in the Quran
                    </Typography>
                    <Typography variant="h5">
                        {" "}
                        Select a Chapter and a Verse :{" "}
                    </Typography>
                </Grid>
            </Grid>

            <Form />

            <Footer />
        </div>
    );
}
