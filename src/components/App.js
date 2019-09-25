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
    background: '#b8b8b8'
  },
  panel: {

  }
}));

const App = () => {
  const [rowValues, setRowProperties] = useState([]);
  const [film, setFilm] = useState(
    {
      id: '',
      title: ''
    }
  );

  const classes = useStyles();

  const handleNewRow = event => {
    event.preventDefault();
    setRowProperties([...rowValues, {
      eventId: film.id
    }]);
  };

  const handleChange = event => {
    setFilm(oldValues => ({
      ...oldValues,
      ['id']: event.target.value,
    }));
  }

  return (
    <Grid
      container
      component="main"
      className={classes.root}
    >
      <CssBaseline />
      <Grid item lg={9} className={classes.render}>
        <RenderPanel layout={rowValues} />
      </Grid>
      <Grid item lg={3} className={classes.panel}>
        <ControlPanel
          film={film}
          onNewRowAdded={handleNewRow}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default App;
