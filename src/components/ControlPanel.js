import React, { useState } from 'react';
import HTMLWidget from './HTMLWidget';
import { useFetchOPosts } from './useFetch'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ControlPanel = ({ emailHTML, values, handleChange, handleButtonClick }) => {
  const response = useFetchOPosts();
  const [isExporting, exportForm] = useState(false);

  return (
    <form>

      <Button variant="contained">
        Add Component
      </Button>

      <FormControl>

        <Select
          name="movieId"
          value={values.movieId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Choose an event</em>
          </MenuItem>
          {response.events && response.events.map( (film) => (
              <MenuItem key={film.id} value={film.id}>
                {film.title}
              </MenuItem>
            )
          )}
        </Select>

        <TextField
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
        />

        <ReactQuill
          style={{
            width: '100%',
            height: '9rem',
            marginBottom: '3rem',
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Add to Newsletter
        </Button>
      </FormControl>


      <select
        name="layoutId"
        value={values.layoutId}
        onChange={handleChange}
      >
        <option></option>
        <option value="1">Layout #1</option>
        <option value="2">Layout #2</option>
        <option value="3">Layout #3</option>
      </select>

      <input
        type="button"
        value="Add to Newsletter"
        onClick={handleButtonClick}
        />
      <input
        type="button"
        value="Generate HTML"
        onClick={() => ( exportForm(true) )}
        />

      <div>
        <HTMLWidget
          isExporting={isExporting}
          html={emailHTML}
        />
      </div>
    </form>
  )
}

/* {JSON.stringify(response.events)} */

export default ControlPanel;
