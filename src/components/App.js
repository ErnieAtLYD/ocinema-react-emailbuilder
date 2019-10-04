import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import RenderPanel from './RenderPanel';
import ControlPanel from './ControlPanel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  render: {
    background: '#b8b8b8',
    height: '100vh',
    overflowY: 'scroll'
  },
  container: {
  },
  panel: {
  }
}));

const App = () => {
  const classes = useStyles();

  const [emailHTML, setEmailHTML] = useState('');
  const [rowValues, setRowProperties] = useState([]);
  const [values, setValues] = useState({
    movieId: 0,
    layoutId: 0
  });

  const handleChange = event => {
    event.persist();
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleNewRow = event => {
    event.preventDefault();
    setRowProperties([...rowValues, values]);
  };

  // Pulling content from RenderPanel to ControlPanel
  const passEmailHTML = (data) => {
    setEmailHTML(data);
  }

  return (
    <Grid
      container
      component="main"
      className={classes.root}
    >
      <CssBaseline />
      <Grid container className={classes.container}>
        <Grid item lg={9} className={classes.render}>
          <RenderPanel
            layout={rowValues}
            callbackFromParent={passEmailHTML}
          />
        </Grid>
        <Grid item lg={3} className={classes.panel}>
          <ControlPanel
            values={values}
            emailHTML={emailHTML}
            handleChange={handleChange}
            handleButtonClick={handleNewRow}
            />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
