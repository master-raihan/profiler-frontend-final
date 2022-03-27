import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import PublishIcon from '@material-ui/icons/Publish';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DescriptionIcon from '@material-ui/icons/Description';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    form: {
        maxWidth: "50%",
        position: "relative",
        left: "25%"
    }
});

const FileUpload = ({ classes, data, callback }) => {
    const [file, setFile] = useState({
        "csvFile": "",
        "status": "",
        "privilegedUser": ""
    });

    const handleInput = (event) => {
        setFile({ ...file, [event.target.name]: event.target.value });
    };

    const handleFileSelect = (event) => {
        setFile({ ...file, "csvFile": event.target.files[0] })
    }

    useEffect(()=>{
        callback({ action: "fileUpload", payload: file });
    }, [file]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <form noValidate className={classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Button variant="outlined" component="label" fullWidth>
                        {
                            file.csvFile ? (<>
                                <DescriptionIcon/>
                                {file.csvFile.name}
                            </>) : (<>
                                <PublishIcon/>
                                Choose File
                            </>)
                        }
                        <input
                            type="file"
                            name="csvFile"
                            onChange={handleFileSelect}
                            hidden
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl size="small" variant="outlined" required fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={file.status}
                            onChange={handleInput}
                            name="status"
                            label="Status"
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Block</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl size="small" variant="outlined" required fullWidth>
                        <InputLabel>Privileged User</InputLabel>
                        <Select
                            value={file.privilegedUser}
                            onChange={handleInput}
                            name="privilegedUser"
                            label="Privileged User"
                        >
                            {
                                data.adminState.users.map((user, index) => (
                                    <MenuItem key={index} value={user.id}>{user.email}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};

export default  withStyles(styles)(FileUpload);