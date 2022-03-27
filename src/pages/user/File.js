import React,{ useEffect, useState } from "react";
import {withStyles} from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Paperbase from "../../components/user/Paperbase";
import { getAllContactsByAuthUser, getFields } from "../../stateManagement/user/userAction";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {filterApi} from '../../api/userApi';
import axios from "axios";

const styles = (theme) => ({
    paper: {
        maxWidth: 997,
        margin: "auto",
        overflow: "hidden",
        marginTop: "10px"
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
    },
    tableContainer: {
        height: "475px"
    }
});

const File = ({ getAllContactsByAuthUser, getFields, userState, classes }) => {
    const location = useLocation();
    const title = location ? location.pathname.replace(/\//g, "") : "";
    const [open, setOpen] = useState(false);
    const [fieldName, setValue] = useState('');
    const [selectedContent, setSelectedContent] = useState({});
    const [inputList, setInputList] = useState([{ fieldName: "",condition: "", fieldValue: "" }]);
    const [value, setRadio] = React.useState('all');

    const handleRadioChange = (event) => {
        setRadio(event.target.value);
    };

    const handleClickOpen = (contact) => {
        setSelectedContent(contact);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = (event) => {
        getAllContactsByAuthUser();
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleFormChange = (event, index) => {
        let data = [...inputList];
        data[index][event.target.name] = event.target.value;
        setInputList(data);
      }

    const handleAddClick = () => {
        setInputList([...inputList, { fieldName: "", condition: "", fieldValue: "" }]);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const addField = (event) => {
        // setValue(event.target.value);
    };

    const handleFilterClick = (event) => {
        filterApi({inputList});
    };

    useEffect(()=>{
        getAllContactsByAuthUser();
        getFields();
    },[]);// eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <Paperbase location={location} title={title}>
            <>
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
                                <FormControl component="fieldset">
                         <FormLabel component="legend">Gender</FormLabel>
                         <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadioChange}>
                          <FormControlLabel value="all" control={<Radio />} label="Any" />
                          <FormControlLabel value="any" control={<Radio />} label="All" />
                         </RadioGroup>
                        </FormControl>
                                <Grid item xs>
                                {inputList.map((input, i) => (
                                   <Grid container>
                                   <Grid item>
                                   <InputLabel id="demo-simple-select-label">Field Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="fieldName"
                                    value={input.fieldName}
                                    onChange={event => handleFormChange(event, i)}
                                >
                                    {userState.fields.map((contact) => (
                                        <MenuItem value={contact}>
                                        { contact }
                                        </MenuItem>
                                    ))}
                                </Select>
                                   </Grid>
                                   <Grid item>
                                   <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="condition"
                                    value={input.condition}
                                    onChange={event => handleFormChange(event, i)}
                                >
                                    <MenuItem value='equal'>equal</MenuItem>
                                    <MenuItem value='start_with'>start with</MenuItem>
                                    <MenuItem value='end_with'>end with</MenuItem>
                                </Select>
                                   </Grid>
                                   <TextField name="fieldValue"
                                    value={input.fieldValue}
                                    onChange={event => handleFormChange(event, i)} id="standard-basic" label="Search Item..." />
                                   {inputList.length !== 1 && <button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                   {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                               
                            </Grid>
                                ))}
                                
                                </Grid>
                                <button onClick={handleFilterClick}>Filter</button>
                                <Grid item>
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
                        userState.isLoading ? (
                            <div className={classes.loaderWrapper}>
                                <CircularProgress />
                            </div>
                        ) : (<TableContainer className={classes.tableContainer}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ fontSize: "11px" }}>Business Name</TableCell>
                                        <TableCell align="left" style={{ fontSize: "11px" }}>Telephone</TableCell>
                                        <TableCell align="left" style={{ fontSize: "11px" }}>Email</TableCell>
                                        <TableCell align="center" style={{ fontSize: "11px" }}>Main Category</TableCell>
                                        <TableCell align="center" style={{ fontSize: "11px" }}>Address</TableCell>
                                        <TableCell align="center" style={{ fontSize: "11px" }}>City</TableCell>
                                        <TableCell align="center" style={{ fontSize: "11px" }}>Zip</TableCell>
                                        <TableCell align="center" style={{ fontSize: "11px" }}>See More</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userState.contacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell align="left" style={{ fontSize: "11px" }}>{contact.business_name}</TableCell>
                                            <TableCell align="left" style={{ fontSize: "11px" }}>{contact.telephone}</TableCell>
                                            <TableCell align="left" style={{ fontSize: "11px" }}>{contact.email}</TableCell>
                                            <TableCell align="center" style={{ fontSize: "11px" }}>{contact.main_category}</TableCell>
                                            <TableCell align="center" style={{ fontSize: "11px" }}>{contact.address}</TableCell>
                                            <TableCell align="center" style={{ fontSize: "11px" }}>{contact.city}</TableCell>
                                            <TableCell align="center" style={{ fontSize: "11px" }}>{contact.zip}</TableCell>
                                            <TableCell align="center"><Button onClick={handleClickOpen.bind(this, contact)} style={{ fontSize: "11px", color: "blue" }}>More</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>)
                    }
                </Paper>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{selectedContent.business_name}</DialogTitle>
                    <DialogContent>
                        Links

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </Paperbase>
    );
};

const mapStateToProps = (state) =>{
    return { userState: state.userReducer }
}

const mapDispatchToProps = (dispatch) =>{
    return { getAllContactsByAuthUser: ()=> dispatch(getAllContactsByAuthUser()), getFields: ()=> dispatch(getFields()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(File));