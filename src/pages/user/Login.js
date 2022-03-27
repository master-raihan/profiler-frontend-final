import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { userLogin } from "../../stateManagement/user/userAction";
import Grid from "@material-ui/core/Grid";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

function Login({ history, userState, login, classes }) {
    document.title = "User Login";
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const inputsHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        login(payload);
    };


    useEffect(() => {
        if(!userState.isLoading && userState.isLoggedIn){
            history.push("/user/files");
        }
    },[userState]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    User LogIn Panel
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={inputsHandler}
                        value={payload.email}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={inputsHandler}
                        value={payload.password}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={userState.isLoading}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/admin/login" variant="body2">
                                Login as admin
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) =>{
    return { userState: state.userReducer }
}

const mapDispatchToProps = (dispatch) =>{
    return { login: (payload)=> dispatch(userLogin(payload)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));