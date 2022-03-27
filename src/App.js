import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AdminUser from "./pages/admin/User";
import AdminFile from "./pages/admin/File";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AdminLogin from "./pages/admin/Login";
import UserLogin from  "./pages/user/Login";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import UserFile from "./pages/user/File";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const NotFound = () => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid style={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sorry, the page you are looking for could not be found.
        </Typography>
        <Typography>
          <Link to="/">Go to Home </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

const HomePage = () => {
  const history = useHistory();
  return (
      <Grid style={{ position: "absolute", top: "40%" }} container direction="row" justifyContent="center" alignItems="center">
        <Grid style={{ textAlign: "center" }}>
          <Typography variant="h2" gutterBottom>
            Welcome to Profiler
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Choose Panel For Login
          </Typography>
            <Button style={{ margin: "10px" }} size="large" onClick={()=>{ history.push('admin/login') }} variant="contained" color="primary">
              Admin Panel
            </Button>
            <Button style={{ margin: "10px" }} size="large" onClick={()=>{ history.push('user/login') }} variant="contained" color="primary">
              User Panel
            </Button>
        </Grid>
      </Grid>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <AdminRoute exact path="/admin/users" component={AdminUser} />
        <AdminRoute exact path="/admin/files" component={AdminFile} />
        <Route exact path="/admin/login" component={AdminLogin}/>

        <UserRoute exact path="/user/files" component={UserFile}/>
        <Route exact path="/user/login" component={UserLogin}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
