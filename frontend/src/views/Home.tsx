import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import NavBar from '../components/Navbar';
import Copyright from '../components/Copyright';
import { Button, Stack } from '@mui/material'; 
import RouteLink from '../components/RouteLink';


function HomeContent() {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <NavBar />

            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Mumble Pricer
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                   A fast option pricer who implement the Black-Scholes model
                </Typography>

                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button href="/pricer" variant="contained">
                        <RouteLink path="/pricer" name="PRICE OPTION" />
                    </Button>
                    <Button href="/myTrades" variant="outlined">
                        <RouteLink path="/myTrades" name="SHOW OPTION" />
                    </Button>
                </Stack>
            </Container>
            {/* End hero unit */}
            
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Home() {
    return <HomeContent />;
}