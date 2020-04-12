import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.linkedin.com/in/habibmanzur/">
          Habid E. Manzur
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }