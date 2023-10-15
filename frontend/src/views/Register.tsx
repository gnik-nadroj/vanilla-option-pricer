import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { useForm  } from 'react-hook-form';
import { RegisterValidationSchema } from '../FormValidation/RegisterValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import NavBar from '../components/Navbar';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../backend/apollo/mutation';

const theme = createTheme();

export default function Register() {
    const [registrationError, seRegistrationError] = React.useState("");

    const [registerFct] = useMutation(REGISTER);

    const nav = useNavigate();

    const onSubmit = async (data: any) => {
        const res = await registerFct({ variables: { email: data.email, password: data.password, firstname: data.firstname, lastname: data.lastname } });

        if (!res.data.register.success)
            seRegistrationError(res.data.register.messages[0]);
        else
            nav('/confirm');
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(RegisterValidationSchema)
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
                        Sign up
                    </Typography>
                    <Typography style={{ color: "red" }}>
                        {registrationError}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register('firstname')}
                                    error={errors.firstname ? true: false }
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.firstname?.message?.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    {...register('lastname')}
                                    error={errors.lastname ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.lastname?.message?.toString()}
                                </Typography>
                            </Grid>
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Comfirm Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("confirmPassword")}
                                    error={errors.confirmPassword ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.confirmPassword?.message?.toString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/SignIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}