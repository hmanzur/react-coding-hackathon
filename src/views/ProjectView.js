import React, { useState, useEffect} from 'react';

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

export default function ProjectItemSide(props) {
    const [project, setProject] = useState({repositories:[]});

    const [isLoading, setIsLoading] = useState(false);

    const {projectId} = props.match.params;

    const [reload] = useState(false);
    
    const fetchData = async () => {
      setIsLoading(true)
      const result  = await ProjectService.getById(projectId)

      setProject(result)
      setIsLoading(false)
    };

    useEffect(() => {
      fetchData()
    }, [reload])

    if (isLoading) {
      return (<div>Loading...</div>)
    }
    
    return (
      <div>
          <h1>
            <Avatar alt={project.language} src={`/static/languages/${project.language}.svg`} /> {project.name}
          </h1>

          <p>{project.description}</p>

          <p>Status {project.is_enabled ? 'Enabled': 'Disabled'}</p>

          <h2>Repositories</h2>
          <List>
            {project.repositories.map(item => (
                <ListItem key={item.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon>{item.repo_type}</Icon>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={`Type ${item.repo_type}`} />

                    <ListItemSecondaryAction>
                        <a target="_blank" href={item.link_url} >
                            <IconButton edge="end" aria-label="link">
                                <Icon>open_in_new</Icon>
                            </IconButton>
                        </a>
                    </ListItemSecondaryAction>
                </ListItem>
                ))}
          </List>
      </div>
    );
}