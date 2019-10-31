import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/blotFormatter', BlotFormatter);

const PanelOn = ({ panelItem, editPanelField, editPanelQuill, hidePanel }) => {
  return (
    <>
      <TextField
        label="Layout type"
        value={panelItem.layout}
      />
      <TextField
        label="Content"
        value={panelItem.content}
        onChange={(event) => editPanelField(event, 'content')}
      />
      <ReactQuill
        value={panelItem.htmldescription}
        modules={{
          blotFormatter: {}
        }}
        onChange={(newValue, delta, source) => editPanelQuill(newValue, source)}
      />
      <ReactQuill
        value={panelItem.htmlquotes}
        modules={{
          blotFormatter: {}
        }}
        onChange={(newValue, delta, source) => editPanelQuill(
          newValue, source, 'htmlquotes'
        )}
      />
      <TextField
        label="Poster thumbnail URL"
        value={panelItem.posterurl}
        onChange={(event) => editPanelField(event, 'posterurl')}
      />
      <TextField
        label="Banner URL"
        value={panelItem.bannerurl}
        onChange={(event) => editPanelField(event, 'bannerurl')}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={hidePanel}>
        Save and close this
      </Button>
    </>
  )
}

export default PanelOn;
