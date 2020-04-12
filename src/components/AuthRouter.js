import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthService.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )