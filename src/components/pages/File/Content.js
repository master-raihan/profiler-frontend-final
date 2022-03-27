import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TabBar from "../../TabBar";
import TabPanel from "../../TabPanel";
import { getAllUsers } from "../../../stateManagement/admin/adminAction";
import { fileUpload, fileProcess, getAllFiles } from "../../../stateManagement/file/fileAction";
import { connect } from "react-redux";
import FileUpload from "./FileUpload";
import MapAttribute from "./MapAttribute";
import FileTable from "./FileTable";

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        width: "997px",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(2),
        },
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
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    message: {
        maxWidth: "100%",
        position: "relative",
        left: "50%"
    }
});

const steps = ['Upload File', 'Map Attribute'];

function getStepContent(step, data, callback) {
    switch (step) {
        case 0:
            return <FileUpload data={data} callback={callback}/>;
        case 1:
            return <MapAttribute data={data} callback={callback}/>;
        default:
            throw new Error('Unknown step');
    }
}

function Content(props) {
    const { classes, adminState, fileState, getAllUsers, fileUpload, fileProcess, getAllFiles } = props;
    const tabNames = ["File Upload", "All Files"];
    const [tabValue, setTabValue] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState({});
    const [mappedData, setMappedData] = useState({});
    const [isNext, setIsNext] = useState(false);

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append("csvFile", file.csvFile);
        formData.append("header", 1);
        formData.append("user_id", file.privilegedUser);
        formData.append("status", file.status);
        fileUpload(formData);
        setIsNext(true);
    }

    const handleAttributeMapping = () => {
        fileProcess(mappedData);
        setIsNext(true);
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setIsNext(false);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setTabValue(newValue);
    };

    const handleCallBack = (callback) => {
        if(callback.action === "fileUpload"){
            setFile(callback.payload);
        }else if (callback.action === "mapAttribute" && !fileState.isLoading){
            setMappedData({
                "csvFileId": fileState.stagedFile.csvFile.id,
                "fields": callback.payload
            });
        }
    }

    useEffect(()=>{
        if(!fileState.isLoading && fileState.response.success && isNext){
            handleNext();
        }
    },[fileState]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(activeStep === 0){
            getAllUsers();
        }
    },[]);// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <React.Fragment>
            <TabBar tabNames={tabNames} value={tabValue} onChange={handleChange} />
            <div className={classes.container}>
                <TabPanel value={tabValue} index={0}>
                    <Paper className={classes.paper}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        File Uploaded Successfully.
                                    </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        Please wait while file is processing...
                                    </Typography>
                                    <Typography align="center">
                                        <Button variant="contained"
                                                color="primary" onClick={()=>{setActiveStep(activeStep - 2);}} className={classes.button}>
                                            Upload New File
                                        </Button>
                                    </Typography>
                                </>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep, { fileState, adminState }, handleCallBack)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && activeStep !==1 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        {activeStep === 0 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleFileUpload}
                                                className={classes.button}
                                            >
                                                Upload
                                            </Button>
                                        )}
                                        {activeStep === 1 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleAttributeMapping}
                                                className={classes.button}
                                            >
                                                Save
                                            </Button>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <FileTable fileState={fileState} adminState={adminState} getAllFiles={getAllFiles}/>
                </TabPanel>
            </div>
        </React.Fragment>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
    return { adminState: state.adminReducer, fileState: state.fileReducer }
}

const mapDispatchToProps = (dispatch) =>{
    return { getAllUsers: ()=> dispatch(getAllUsers()), fileUpload: (payload)=> dispatch(fileUpload(payload)), fileProcess: (payload)=> dispatch(fileProcess(payload)), getAllFiles: ()=> dispatch(getAllFiles()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));
