import {
    Typography,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
} from "@mui/material";
import Script from "next/script";

export default function Navbar() {
    return (
        <div>
            <Script src="https://kit.fontawesome.com/03fd5e7bff.js"></Script>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                    <Toolbar>
                        <Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <Box
                                    component="img"
                                    src="/qjLogo.png"
                                    alt="Quran Journey"
                                    sx={{ height: 100, width: 100 }}
                                ></Box>
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h5"
                                component="div"
                                color="black"
                            >
                                Quran Journey
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "left",
                            }}
                        >
                            <IconButton>
                                <a href="" className="fa-solid fa-envelope"></a>
                            </IconButton>
                            <IconButton>
                                <a
                                    href=""
                                    className="fa-solid fa-file-code"
                                ></a>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
