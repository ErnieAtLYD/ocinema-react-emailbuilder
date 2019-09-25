import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EventChooser = ({ film, handleChange }) => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const sampleFeed = [
    {
      'id': 1,
      'title': 'Tel Aviv on Fire',
      'description': 'Salam, a Palestinian living in Jerusalem, works on a popular soap opera. He gets ideas for the show from the commander at the checkpoint he passes through each day, and his career takes off.',
      'poster': 'https://image.tmdb.org/t/p/w220_and_h330_face/dHRojbGfWCFvk2wfBPd66hx7OCv.jpg'
    },
    {
      'id': 2,
      'title': 'Before You Know It',
      'description': 'Salam, a Palestinian living in Jerusalem, works on a popular soap opera. He gets ideas for the show from the commander at the checkpoint he passes through each day, and his career takes off.',
      'poster': 'https://image.tmdb.org/t/p/w220_and_h330_face/dHRojbGfWCFvk2wfBPd66hx7OCv.jpg'
    }
  ];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        Event
      </InputLabel>
      <Select
        value={film.id}
        onChange={handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: 'title',
          id: 'outlined-age-simple',
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {sampleFeed.map((event) =>
          <MenuItem key={event.id} value={event.id}>{event.title}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default EventChooser;
