import React, { useEffect, useRef, useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/blotFormatter', BlotFormatter);

const PanelOn = ({ panelItem, editPanelField, editPanelQuill, hidePanel }) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => { setLabelWidth(inputLabel.current.offsetWidth) }, []);
  return (
    <>
      <InputLabel shrink ref={inputLabel} htmlFor="layouttype-label">
        Layout type
      </InputLabel>
      <Select
        onChange={(event) => editPanelField(event, 'layout')}
        value={panelItem.layout}
        labelWidth={labelWidth}
        inputProps={{
          id: 'layouttype-label',
        }}>
        <MenuItem value="header">Email Header</MenuItem>
        <MenuItem value="footer">Email Footer</MenuItem>
        <MenuItem value="membership-drive">Membership Drive</MenuItem>
        <MenuItem value="full-bleed-wrapper">Section Header</MenuItem>
        <MenuItem value="full-bleed-wrapper-2">Content: Full width</MenuItem>
        <MenuItem value="filmlayout">Content: Film Layout #1</MenuItem>
      </Select>
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
