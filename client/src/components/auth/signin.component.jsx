import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import ForgotPassword from "./forgot-password.component";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
    const [forgotPasswordPage, setForgotPasswordPage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/" />;
    }

    const openForgotPasswordPopup = (event) => {
        event.preventDefault();
        setForgotPasswordPage(true);
    };

    const closeForgotPasswordPopup = (event) => {
        event.preventDefault();
        setForgotPasswordPage(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/users/login`,
            {
                email,
                password,
            }
        );

        // console.log(res.data.token);

        localStorage.setItem("token", res.data.token);
        const decoded = jwtDecode(res.data.token);
        localStorage.setItem("email", decoded.email);
        localStorage.setItem("fullName", decoded.fullName);
        navigate("/");

        // way to get token
        // setTimeout(() => {
        //     console.log(localStorage.getItem("token"));
        // }, 3000);

        // way to set header for post method
        // const res2 = await axios.post(`${API_URL}/users/me`,
        // {
        //    email: "z5I3h@example.com",
        //    password: "123456789",
        // },
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });

        // way to set header for post method

        // const res3 = await axios.get(`${API_URL}/event/user/all`, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        // });

        // console.log(res3);

        // console.log(document.cookie);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                    action="/signin"
                    method="POST"
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                sx={{ cursor: "pointer" }}
                                variant="body2"
                                onClick={openForgotPasswordPopup}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="signup"
                                variant="body2"
                                sx={{ cursor: "pointer" }}
                            >
                                {"Don't have an account?"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <ForgotPassword
                    open={forgotPasswordPage}
                    handleClose={closeForgotPasswordPopup}
                />
            </Box>
        </Container>
    );
}
