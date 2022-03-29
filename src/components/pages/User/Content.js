import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TabBar from "../../TabBar";
import TabPanel from "../../TabPanel";
import { addNewUser, getAllUsers } from "../../../stateManagement/admin/adminAction";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  loaderWrapper : {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(5)
  }
});

const status =(id)=>{
  switch (id){
    case 0:
      return 'Blocked';
    case 1:
      return <Chip label="Active" color="primary" />;
    case 2:
      return <Chip label="Inactive" />;
  }
}

function Content(props) {
  const { classes, addNewUser, adminState, getAllUsers } = props;
  const tabNames = ["Users", "Tags"];
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
      status: "",
      first_name: "",
      last_name: "",
      email: "",
      password: ""
  });
  const [isLoad, setIsLoad] = useState(false);
  const [openSnack, setOpenSnack] = useState({ isActive: false, message: '' });

  const handleInput = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoad(false);
    setUser({
      status: "",
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewUser(user);
    setIsLoad(true);
  }

  const handleRefresh = (event) => {
    getAllUsers();
  };

  useEffect(()=>{
    getAllUsers();
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    if(isLoad){
      if(!adminState.isLoading && !adminState.error){
        setOpen(false);
      }
    }
  },[adminState]);

  return (
    <React.Fragment>
      <TabBar tabNames={tabNames} value={tabValue} onChange={handleChange} />
      <div className={classes.container}>
        <TabPanel value={tabValue} index={0}>
          <Paper className={classes.paper}>
            <AppBar
              className={classes.searchBar}
              position="static"
              color="default"
              elevation={0}
            >
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon className={classes.block} color="inherit" />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Search by email address, phone number, or user UID"
                      InputProps={{
                        disableUnderline: true,
                        className: classes.searchInput,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.addUser}
                      onClick={handleClickOpen}
                    >
                      Add User
                    </Button>
                    <Tooltip title="Reload">
                      <IconButton onClick={handleRefresh}>
                        <RefreshIcon
                          className={classes.block}
                          color="inherit"
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            {
              adminState.isLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
              ) : (<Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">First Name</TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminState.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.first_name}</TableCell>
                        <TableCell align="left">{user.last_name}</TableCell>
                        <TableCell align="center">{status(user.status)}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>)
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Create New User."}</DialogTitle>
              <DialogContent>
                  <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleInput}
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            autoFocus
                        />
                        { adminState.errors && 'first_name' in adminState.errors && <FormHelperText className={classes.helper}>{adminState.errors['first_name']}</FormHelperText> }
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInput}
                            autoComplete="lname"
                        />
                        { adminState.errors && 'last_name' in adminState.errors && <FormHelperText className={classes.helper}>{adminState.errors['last_name']}</FormHelperText> }
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormControl variant="outlined" required fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                              name="status"
                              value={user.status}
                              label="Status"
                              onChange={handleInput}
                          >
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="2">Block</MenuItem>
                          </Select>
                        </FormControl>
                        { adminState.errors && 'status' in adminState.errors && <FormHelperText className={classes.helper}>{adminState.errors['status']}</FormHelperText> }
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                            autoComplete="email"
                        />
                        {  adminState.errors && 'email' in adminState.errors && <FormHelperText className={classes.helper}>{adminState.errors['email']}</FormHelperText> }
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            value={user.password}
                            onChange={handleInput}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        { adminState.errors && 'password' in adminState.errors && <FormHelperText className={classes.helper}>{adminState.errors['password']}</FormHelperText> }
                      </Grid>
                    </Grid>
                  </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
          <Snackbar
              open={openSnack.isActive}
              onClose={handleClose}
              message={openSnack.message}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {tabNames[1]}
        </TabPanel>
      </div>
    </React.Fragment>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return { adminState: state.adminReducer }
}

const mapDispatchToProps = (dispatch) =>{
  return { addNewUser: (payload)=> dispatch(addNewUser(payload)), getAllUsers: ()=> dispatch(getAllUsers()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));
