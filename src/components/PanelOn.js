import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PanelOn = ({ panelItem, handleChange, handleQuillDesc, handleQuillQuote, turnOff }) => {
  return (
    <>
      <TextField
        label="Layout type"
        value={panelItem.layout}
      />
      <TextField
        label="Content"
        value={panelItem.content}
        onChange={handleChange('content')}
      />
      <ReactQuill
        defaultValue={panelItem.htmldescription}
        onChange={handleQuillDesc} />

      <ReactQuill
        defaultValue={panelItem.htmlquotes}
        onChange={handleQuillQuote} />

      <TextField
        label="Poster thumbnail URL"
        value={panelItem.posterurl}
      />
      <TextField
        label="Banner URL"
        value={panelItem.bannerurl}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={turnOff}>
        Save and close this
      </Button>
    </>
  )
}

export default PanelOn;
