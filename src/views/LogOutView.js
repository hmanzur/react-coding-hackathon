import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function LogOutSite(props) {
    AuthService.signout()

    return (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />)
}