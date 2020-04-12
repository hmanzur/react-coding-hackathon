import React, { useState } from 'react';
import {
  Icon,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles'
import { GoogleLogin } from 'react-google-login';
import { Redirect } from "react-router-dom";

import Copyright from '../components/Copyright';
import AuthService from '../services/AuthService';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(/static/img/Globant_home_background.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  },
  googleLogin: {
    width: '100%'
  },
  loginProgress: {}
}));

const config = require('../env_config.json')['local']

export default function SignInSide(props) {
  const classes = useStyles();

  const [username, setUsername] = useState(process.env.REACT_APP_DEFAULT_USERNAME || '');

  const [password, setPassword] = useState(process.env.REACT_APP_DEFAULT_PASSWORD || '');

  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    setIsLoading(true)

    try {
      const {data} = await AuthService.login(username, password)

      AuthService.saveToken(data.access_token)
    } catch (e) {
      console.error(e)
    }
    
    setIsLoading(false)
  }

  const handleGoogleLogin = (response) => {
    AuthService.saveToken(response.accessToken)
  }

  function validateForm() {
    return !isLoading && (username.length > 0 && password.length > 0);
  }

  if (AuthService.isAuthenticated) {
    return (<Redirect to={{
      pathname: '/projects',
      state: { from: props.location }
    }} />)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>lock</Icon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or email"
              name="username"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              endIcon={!isLoading && <Icon>send</Icon>}
              disabled={!validateForm()}
            >
              {isLoading ? <CircularProgress size={30} className={classes.loginProgress} /> : "Sign in"}
            </Button >

            <GoogleLogin
              clientId={config.google_client_id}
              buttonText="Login with Google"
              className={classes.googleLogin}
              onSuccess={handleGoogleLogin}
              cookiePolicy={'single_host_origin'}
            />

            <Box mt={12}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}