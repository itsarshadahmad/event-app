import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function Error() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button variant="contained" href="/" sx={{ my: 1 }}>
                            Back Home
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt=""
                            width={500}
                            height={250}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}