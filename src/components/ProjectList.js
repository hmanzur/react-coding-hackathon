import React, { useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";

import { 
  List,
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  ListItemSecondaryAction,
  IconButton,
  Icon
} from '@material-ui/core';

import ProjectService from '../services/ProjectService'


export default function ProjectsList(props) {
    const [projects, setProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [projectId, setProjectId] = useState(null);

    const [reload] = useState(props.reload);

    const handleClick = (item) => {
      setProjectId(item.id)
    }
    
    const fetchData = async () => {
      setIsLoading(true)
      const result  = await ProjectService.listAll()

      setProjects(result)
      setIsLoading(false)
    };

    useEffect(() => {
      fetchData()
    }, [reload])

    if (isLoading) {
      return (<div>Loading...</div>)
    } 
    
    if (projectId) {
      return (<Redirect to={{
        pathname: `/projects/${projectId}`,
        state: { from: props.location }
      }} />)
    } 
    
    return (
      <List>
        {projects.map(item => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.language} src={`/static/languages/${item.language}.svg`} />
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="link" onClick={() => handleClick(item)}>
                <Icon>open_in_new</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
}