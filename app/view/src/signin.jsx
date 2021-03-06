const React = require("react");
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    margin: 'auto',
    width: 400,
    display: 'block',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
  },
  inputid: {
    marginTop: '4%',
  },
  inputpw: {
    marginTop: '4%',
  },
  checkbox: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    display: 'block',
    width: '100%',
  },
  extraContentsAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2.5,
  },
  signupbutton: {
    marginLeft: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
  const { classes } = props;
  const SignUpLink = props => <Link to="/signup/" {...props} />
  const ForgotPasswordLink = props => <Link to="/forgotpassword/" {...props} />

  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [enteredId, setEnteredId] = useState("");
  const [enteredPW, setEnteredPW] = useState("");

  function submit() {
    fetch("http://localhost:8080/auth/login", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ "email": enteredId, "password": enteredPW }),
    }).then(res => res.json()).then(console.log).catch(console.log)
  }

  return (
    <div>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            Sign In
          </Typography>
          <FormControl fullWidth className={classes.inputid}>
            <Input
              required
              placeholder="ID"
              autoFocus={true}
              onChange={e => { setEnteredId(e.target.value) }}
            />
          </FormControl>
          <FormControl fullWidth className={classes.inputpw}>
            <Input
              required
              placeholder="Password"
              onChange={e => { setEnteredPW(e.target.value) }}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox onChange={e => { setIsRememberChecked(e.target.checked)} } />}
            label="Remember me"
            className={classes.checkbox}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.button}>
            Login
          </Button>
        </Paper>
        <div className={classes.extraContentsAlign}>
          <Typography>
            If you don't have account yet?
          </Typography>
          <Button
            component={SignUpLink}
            variant="contained"
            color="primary"
            className={classes.signupbutton}
          >
            Sign Up
          </Button>
        </div>
        <div className={classes.extraContentsAlign}>
          <Typography
            component={ForgotPasswordLink}
          >
            Forgot Password?
          </Typography>
        </div>
      </main>
    </div>
  );
}

export default withStyles(styles)(SignIn);
