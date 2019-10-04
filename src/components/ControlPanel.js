import React, { useState } from 'react';
import HTMLWidget from './HTMLWidget';
import { useFetchOPosts } from './useFetch'

const ControlPanel = ({ emailHTML, values, handleChange, handleButtonClick }) => {
  const response = useFetchOPosts();
  const [isExporting, exportForm] = useState(false);

  return (
    <form>
      <select
        name="movieId"
        value={values.movieId}
        onChange={handleChange}
      >
        <option></option>
        {response.events && response.events.map( (film) => (
            <option key={film.id} value={film.id}>
              {film.title}
            </option>
          )
        )}
      </select>

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
        <HTMLWidget isExporting={isExporting} html={emailHTML} />
      </div>
    </form>
  )
}

/* {JSON.stringify(response.events)} */

export default ControlPanel;
