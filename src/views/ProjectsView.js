import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Fab, Icon } from '@material-ui/core';

import ProjectsList from '../components/ProjectList';
import AuthService from '../services/AuthService';

export default function ProjectsSide() {

  const [isLogout, setLogout] = useState(false);

  const handleLogout = () => {
    AuthService.signout()
    setLogout(true)
  }
    
  if (isLogout) {
    return (<Redirect to={{
      pathname: '/login',
    }} />)
  }
  
  return (
    <div>
      <h1>Project lists</h1>
      <ProjectsList reload={false} />
      <Fab variant="extended" onClick={handleLogout}>
        <Icon>exit_to_app</Icon>
        Logout
      </Fab>
    </div>
  );
}