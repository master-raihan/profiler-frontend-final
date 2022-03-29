import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { adminLogin } from "../../stateManagement/admin/adminAction";
import Grid from "@material-ui/core/Grid";
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from "@material-ui/core/Snackbar";

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
    helper: {
        color: 'red'
    }
});

function Login({ history, adminState, login, classes }) {
    document.title = "Admin Login";
    const [openSnack, setOpenSnack] = useState({ isActive: false, message: '' });
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({ email: false, password: false });
    const inputsHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value });
        setError({...error, [e.target.name]: false });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        login(payload);
    };

    const handleClose = () => {
        setOpenSnack(false);
    };

    useEffect(() => {
        if(!adminState.isLoading && adminState.isLoggedIn){
            history.push("/admin/users");
        }

        if(adminState.error){
            if(typeof adminState.errors === 'object'){
                setError({ email: 'email' in adminState.errors, password: 'password' in adminState.errors });
            }else if (typeof adminState.errors === 'string'){
                setOpenSnack({ isActive: true, message: adminState.errors });
            }
        }
    },[adminState]);// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin LogIn Panel
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
                    { error.email && <FormHelperText className={classes.helper}>{adminState.errors['email']}</FormHelperText> }
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
                    { error.password && <FormHelperText className={classes.helper}>{adminState.errors['password']}</FormHelperText> }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={adminState.isLoading}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/user/login" variant="body2">
                                Login as user
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar
                open={openSnack.isActive}
                onClose={handleClose}
                message={openSnack.message}
            />
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) =>{
    return { adminState: state.adminReducer }
}

const mapDispatchToProps = (dispatch) =>{
    return { login: (payload)=> dispatch(adminLogin(payload)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));