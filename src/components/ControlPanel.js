import React from 'react';
import Button from '@material-ui/core/Button';
import LayoutPicker from './LayoutPicker';
import EventChooser from './EventChooser';

const ControlPanel = ({ rowValue, onNewRowAdded, handleChange, film }) => {
  return (
    <form onSubmit={onNewRowAdded} noValidate>
      <LayoutPicker />
      <EventChooser film={film} handleChange={handleChange} />
      <Button
        variant="contained"
        color="primary"
        type="submit" >
        Add Layout
      </Button>
    </form>
  )
}

export default ControlPanel;
