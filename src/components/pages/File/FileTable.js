import React, {useEffect} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import CachedIcon from '@material-ui/icons/Cached';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BlockIcon from '@material-ui/icons/Block';

const styles = (theme) => ({
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
            return <Chip icon={<BlockIcon/>} label="Blocked" color="secondary" />;
        case 1:
            return <Chip icon={<HourglassEmptyIcon/>} label="Pending" color="primary" />;
        case 2:
            return <Chip icon={<CachedIcon/>} label="Processing" color="secondary" />;
        case 3:
            return <Chip icon={<DoneIcon/>} label="Processed" color="#e040fb"/>;
    }
}

function FileTable({ classes, fileState, getAllFiles }) {

    useEffect(()=>{
        getAllFiles()
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                fileState.isLoading ? (
                    <div className={classes.loaderWrapper}>
                        <CircularProgress />
                    </div>
                ) : (<Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">File Location</TableCell>
                            <TableCell align="center">File Status</TableCell>
                            <TableCell align="center">Uploaded At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileState.files.map((file) => (
                            <TableRow key={file.id}>
                                <TableCell align="left">{file.file_location}</TableCell>
                                <TableCell align="center">{status(file.status)}</TableCell>
                                <TableCell align="center">{file.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)
            }
        </>
    );
}


export default withStyles(styles)(FileTable);
