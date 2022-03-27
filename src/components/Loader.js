import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    loaderWrapper : {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(5)
    }
});

function Content({ classes }) {

    return (
        <div className={classes.loaderWrapper}>
            <CircularProgress />
        </div>
    );
}


export default withStyles(styles)(Content);
