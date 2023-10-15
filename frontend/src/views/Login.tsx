import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import Copyright from '../components/Copyright';
import NavBar from '../components/Navbar';
import { LoginValidationSchema } from '../FormValidation/LoginValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../backend/apollo/mutation';
import {useNavigate } from 'react-router-dom';
import { AuthState } from '../state/GlobalState';


const theme = createTheme();

export default function Login() {

    const [loginError, setLoginError] = useState("");

    const [, setIsAuthenticated] = useContext(AuthState);

    const [loginFct] = useMutation(LOGIN);

    const nav = useNavigate();

    const onSubmit = async (data: any) => {
        const res = await loginFct({ variables: { email: data.email, password: data.password } });

        if (!res.data.login.success)
            setLoginError(res.data.login.messages[0]);
        else {
            setIsAuthenticated(true);
            nav('/');
        }
            
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(LoginValidationSchema)
    });

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography style={ {color: "red"} }>
                        {loginError}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    {...register('email')}
                                    error={errors.email ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.email?.message?.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.password?.message?.toString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
    );
}