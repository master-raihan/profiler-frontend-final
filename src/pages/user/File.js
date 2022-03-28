import React,{ useEffect, useState } from "react";
import {withStyles} from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Paperbase from "../../components/user/Paperbase";
import {getAllContactsByAuthUser, getFields, addCustomField, getCustomFieldsByAuthUser, filter} from "../../stateManagement/user/userAction";
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

const File = ({ getAllContactsByAuthUser, getCustomFieldsByAuthUser, getFields,userState, addCustomField, filter, classes }) => {
    const location = useLocation();
    const title = location ? location.pathname.replace(/\//g, "") : "";
    const [open, setOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState({});
    const [customFieldName, setCustomFieldName] = useState("");
    const [customFields, setCustomFields] = useState({});
    const [openCustomFieldDialog, setOpenCustomFieldDialog] = useState(false);
    const [inputList, setInputList] = useState([{ fieldName: "",condition: "", fieldValue: "" }]);
    const [match, setMatch] = useState('any');

    const handleFilterFormChange = (event, index) => {
        let data = [...inputList];
        data[index][event.target.name] = event.target.value;
        setInputList(data);
    };

    const handleMatch = (event) => {
        setMatch(event.target.value);
    }

    const handleClickOpen = (contact) => {
        setSelectedContent(contact);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = (event) => {
        getAllContactsByAuthUser();
        setCustomFields(userState.customFields);
    };

    const handleNewCustomField = () => {
        setCustomFields({ ...userState.customFields, [customFieldName]: {}});
    };

    const handleFormChange = (event) => {
        const [ contactId, customField ] = event.target.name.split('-');
        const fieldValue = event.target.value;
        setCustomFields({ ...customFields, [customField]: { ...customFields[customField], [contactId]: fieldValue } });
    }

    const handleFormSubmitChange = (event) => {
        event.preventDefault();
        const [ contactId, customField ] = event.target.name.split('-');
        const fieldValue = event.target.value;
        addCustomField({contact_id: contactId, field_name: customField, field_value: fieldValue});
    }

    const handleAddClick = () => {
        setInputList([...inputList, { fieldName: "", condition: "", fieldValue: "" }]);
    };

    const handleFilterClick = (event) => {
        const data = { queries: inputList, match: match };
        filter(data);
    };

    useEffect(()=>{
        getAllContactsByAuthUser();
        getCustomFieldsByAuthUser();
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
                                <Grid item xs>
                                    {
                                        inputList.map((input, i)=>(
                                            <Grid container>
                                                <Grid item>
                                                    <select name="fieldName"
                                                            value={input.fieldName}
                                                            onChange={event => handleFilterFormChange(event, i)}>
                                                            <option>--select--</option>
                                                            {userState.fields.map((contact) => (
                                                                <option value={contact}>
                                                                    { contact }
                                                                </option>
                                                            ))}
                                                    </select>
                                                    <select name="condition"
                                                            value={input.condition}
                                                            onChange={event => handleFilterFormChange(event, i)}>
                                                        <option>--select--</option>
                                                        <option value='equal'>equal</option>
                                                        <option value='start_with'>start with</option>
                                                        <option value='end_with'>end with</option>
                                                    </select>
                                                    <input name="fieldValue"
                                                           value={input.fieldValue}
                                                           onChange={event => handleFilterFormChange(event, i)} placeholder="Search value"/>
                                                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add More</button>}
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                    {inputList.length > 1 && (<> All
                                        <input type="radio" checked={match === 'all'} onChange={handleMatch} name="match" value="all"/>
                                        Any
                                        <input type="radio" checked={match === 'any'} onChange={handleMatch} name="match" value="any"/></>)}
                                </Grid>
                                <Grid item><Button variant="contained" color="primary" size="small" onClick={handleFilterClick}>Filter</Button></Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.addUser}
                                        onClick={()=>{ setOpenCustomFieldDialog(true) }}
                                    >
                                        Add New Field
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
                                        {
                                            Object.entries(customFields).map(([key, value]) => (
                                                <TableCell align="center" style={{ fontSize: "11px" }}>{key}</TableCell>
                                            ))
                                        }
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
                                            {
                                                Object.entries(customFields).map(([key, value]) => (
                                                    <TableCell style={{ fontSize: "11px" }}><input name={`${contact.id}-${key}`} onChange={handleFormChange} onBlur={handleFormSubmitChange} value={value[contact.id]}/></TableCell>
                                                ))
                                            }
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


                <Dialog aria-labelledby="simple-dialog-title" open={openCustomFieldDialog} onClose={()=>{ setOpenCustomFieldDialog(false) }}>
                    <DialogTitle id="simple-dialog-title">Field Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            placeholder="Field Name"
                            onChange={(e)=>{ setCustomFieldName(e.target.value) }}
                            value={customFieldName}
                            InputProps={{
                                disableUnderline: false,
                                className: classes.searchInput,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleNewCustomField}>
                            Save
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
    return { getAllContactsByAuthUser: ()=> dispatch(getAllContactsByAuthUser()), getFields: ()=> dispatch(getFields()), addCustomField: (payload)=> dispatch(addCustomField(payload)), getCustomFieldsByAuthUser: ()=> dispatch(getCustomFieldsByAuthUser()), filter: (payload)=> dispatch(filter(payload)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(File));