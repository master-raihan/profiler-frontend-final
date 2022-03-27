import React, {useEffect} from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Loader from "../../Loader";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
    tableContainer: {
        overflowX: "auto",
        border: "1px solid #e9e5e3",
        borderRadius: "4px",
    },
    paper: {
        width: '80%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    label: {
        fontSize: "11px"
    }
});

const MapAttribute = ({ classes, callback, data }) => {
    const [mapping, setMapping] = React.useState({
        "business_name": 0,
        "telephone": 1,
        "email": 2,
        "email_host": 3,
        "website_url": 4,
        "linkedin": 5,
        "facebook_profile": 6,
        "facebook_messenger": 7,
        "instagram": 8,
        "twitter": 9,
        "google_rank": 10,
        "domain_registered": 11,
        "domain_expiry": 12,
        "domain_nameserver": 13,
        "domain_registrar": 14,
        "instagram_followers": 15,
        "instagram_follows": 16,
        "instagram_total_photos": 17,
        "instagram_average_likes": 18,
        "instagram_average_comments": 19,
        "instagram_is_verified": 20,
        "instagram_highlight_reel_count": 21,
        "instagram_is_biz_account": 22,
        "instagram_account_name": 23,
        "yelp_ads": 24,
        "fb_messenger_ads": 25,
        "facebook_ads": 26,
        "instagram_ads": 27,
        "adwords_ads": 28,
        "gmaps_url": 29,
        "gmb_claimed": 30,
        "facebook_pixel": 31,
        "google_pixel": 32,
        "criteo_pixel": 33,
        "google_stars": 34,
        "google_count": 35,
        "yelp_stars": 36,
        "yelp_count": 37,
        "facebook_stars": 38,
        "facebook_count": 39,
        "main_category": 40,
        "address": 41,
        "city": 42,
        "state": 43,
        "zip": 44,
        "mobile_friendly": 45,
        "google_analytics": 46,
        "schema_markup":47,
        "use_wordpress":48,
        "use_shopify": 49,
        "linkedin_analytics": 50
    });

    const handleChange = (event) => {
        callback({ action: "mapAttribute", payload: mapping });
        setMapping({ ...mapping, [event.target.name]: event.target.value});
    };

    useEffect(()=>{
        callback({ action: "mapAttribute", payload: mapping });
    },[mapping]);// eslint-disable-line react-hooks/exhaustive-deps
    return (
        !data.fileState.isLoading ? (<TableContainer className={classes.tableContainer}>
            <Table size="small" className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            data.fileState.stagedFile && data.fileState.stagedFile.headings.map((heading, index)=>(
                                <TableCell align="center" style={{ fontSize: "12px" }} key={index}>
                                    <FormControl size="small" className={classes.formControl}>
                                        <InputLabel className={classes.label}>{heading}</InputLabel>
                                        <Select
                                            className={classes.label}
                                            name={heading}
                                            label={heading}
                                            value={mapping[heading]}
                                            onChange={handleChange}
                                        >
                                            <MenuItem className={classes.label} value={-1}>Skip</MenuItem>
                                            {
                                                data.fileState.stagedFile.headings.map((heading, index)=>(
                                                    <MenuItem key={index} className={classes.label} value={index}>{heading}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.fileState.stagedFile && data.fileState.stagedFile.csvData.map((column, index)=>(
                            index < 2 && <TableRow key={index}>
                                {
                                    column.map((row, indexi)=>(
                                        <TableCell align="center" key={indexi} style={{ fontSize: "11px" }}>{row}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>):(<Loader/>)
    );
};

export default withStyles(styles)(MapAttribute);