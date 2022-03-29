import React, {useEffect, useMemo, useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Paperbase from "../../components/user/Paperbase";
import {
    getAllContactsByAuthUser,
    getFields,
    addCustomField,
    getCustomFieldsByAuthUser,
    filter,
    deleteCustomFieldsByAuthUser
} from "../../stateManagement/user/userAction";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import FilterListIcon from '@material-ui/icons/FilterList';
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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Pagination from '../../libs/Pagination';
import FormHelperText from "@material-ui/core/FormHelperText";


let PageSize = 10;

const styles = (theme) => ({
    paper: {
        maxWidth: 997,
        margin: "auto",
        overflow: "hidden",
        marginTop: "10px",
        borderRadius: 0
    },
    searchBar: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        marginTop: "10px",
        padding: "14px 0px"
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
    },
    simpleButton: {
        marginBottom: "1px",
        backgroundColor: "#009be5",
        border: "none",
        padding: "3px",
        color: "#f1eaea",
        paddingLeft: "4px",
        paddingRight: "4px",
        marginRight: "4px",
        marginLeft: "4px",
        "&:hover": {
            color: "#006db3",
        }
    },
    deleteBtn: {
        cursor: "pointer",
        backgroundColor: "#e74c3c29",
        border: 0,
        color: "#d94f4f",
        fontSize: "17px",
        borderRadius: "5px",
        marginLeft: "4px",
        "&:hover": {
            color: "#542424"
        }
    },
    customHeader: {
        fontSize: "13px", fontWeight: "bold",
    }
});

const File = ({ getAllContactsByAuthUser, getCustomFieldsByAuthUser, getFields,userState, addCustomField, filter, classes, deleteCustomFieldsByAuthUser }) => {
    const location = useLocation();
    const title = location ? location.pathname.replace(/\//g, "") : "";
    const [open, setOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState({});
    const [customFieldName, setCustomFieldName] = useState("");
    const [customFields, setCustomFields] = useState({});
    const [openCustomFieldDialog, setOpenCustomFieldDialog] = useState(false);
    const [inputList, setInputList] = useState([{ fieldName: "",condition: "", fieldValue: "" }]);
    const [match, setMatch] = useState('any');
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState({ isActive: false, message: "" });

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return userState.contacts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, userState]);

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

    const deleteCustom = (fieldName) =>{
        deleteCustomFieldsByAuthUser({ fieldName: fieldName });
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = (event) => {
        getAllContactsByAuthUser();
        setCustomFields(userState.customFields);
    };

    const handleNewCustomField = () => {
        if(customFieldName.length > 0){
            setCustomFields({ ...userState.customFields, [customFieldName]: {}});
            setOpenCustomFieldDialog(false);
        }else{
            setError({ isActive: true, message: 'Field Required' });
        }
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

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    useEffect(()=>{
        getAllContactsByAuthUser();
        getCustomFieldsByAuthUser();
        getFields();
        setIsLoad(true);
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(isLoad){
            setCustomFields(userState.customFields);
        }
    },[userState]);

    return (
        <Paperbase location={location} title={title}>
            <>
                <AppBar
                    className={classes.searchBar}
                    position="static"
                    color="default"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <FilterListIcon className={classes.block} color="inherit" />
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
                                                {inputList.length !== 1 && <button
                                                    className={classes.simpleButton}
                                                    onClick={() => handleRemoveClick(i)}>X</button>}
                                                {inputList.length - 1 === i && <button onClick={handleAddClick} className={classes.simpleButton}>Add More</button>}
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
                                    size="small"
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
                <Paper className={classes.paper}>
                    {
                        userState.isLoading ? (
                            <div className={classes.loaderWrapper}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <div style={{ overflow: 'auto', height: '470px' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{
                                            backgroundColor: "#f5f5f5",
                                            height: "35px"
                                        }}>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Business Name</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Telephone</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Email</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Main Category</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Address</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>City</TableCell>
                                            <TableCell  style={{ fontSize: "13px", fontWeight: "bold" }}>Zip</TableCell>
                                            {
                                                Object.entries(customFields).map(([key, value]) => (
                                                    <TableCell align="center"><span className={classes.customHeader}>{key}</span>
                                                        <button className={classes.deleteBtn} onClick={deleteCustom.bind(this, key)}>
                                                            x
                                                        </button>
                                                    </TableCell>
                                                ))
                                            }
                                            {/*<TableCell style={{ fontSize: "13px", fontWeight: "bold" }}>See More</TableCell>*/}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentTableData.map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.business_name}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.telephone}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.email}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.main_category}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.address}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.city}</TableCell>
                                                <TableCell  style={{ fontSize: "11px" }}>{contact.zip}</TableCell>
                                                {
                                                    Object.entries(customFields).map(([key, value]) => (
                                                        <TableCell style={{ fontSize: "11px" }}><input name={`${contact.id}-${key}`} onChange={handleFormChange} onBlur={handleFormSubmitChange} value={value[contact.id]}/></TableCell>
                                                    ))
                                                }
                                                {/*<TableCell align="center"><Button onClick={handleClickOpen.bind(this, contact)} style={{ fontSize: "11px", color: "blue" }}>More</Button></TableCell>*/}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>)
                    }
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={userState.contacts.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />

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
                            onChange={(e)=>{ setCustomFieldName(e.target.value); setError({ isActive: false, message: '' }); }}
                            value={customFieldName}
                            InputProps={{
                                disableUnderline: false,
                                className: classes.searchInput,
                            }}
                        />
                        {error.isActive && <FormHelperText>{error.message}</FormHelperText>}
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
    return { getAllContactsByAuthUser: ()=> dispatch(getAllContactsByAuthUser()), getFields: ()=> dispatch(getFields()), addCustomField: (payload)=> dispatch(addCustomField(payload)), getCustomFieldsByAuthUser: ()=> dispatch(getCustomFieldsByAuthUser()), filter: (payload)=> dispatch(filter(payload)), deleteCustomFieldsByAuthUser: (payload)=> dispatch(deleteCustomFieldsByAuthUser(payload)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(File));