// @flow
import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ImageUploaderModal from "./ImageUploaderModal";

import ItemTypes from "./ItemTypes";

import "react-quill/dist/quill.snow.css";

Quill.register("modules/blotFormatter", BlotFormatter);

type PanelType = {
  panelItem: NewsletterLayoutItemType,
  panelFieldStatus: any,
  actions: {
    editPanelField: (SyntheticInputEvent<>, string) => void,
    editPanelQuill: (any, string, ?string) => void,
    hidePanel: Function
  }
};

/**
 * Contains redux methods in containers/PanelOnContainer.js
 **/
const PanelOn = ({ panelItem, panelFieldStatus, actions }: PanelType) => {
  const { editPanelField, editPanelQuill, hidePanel } = actions;
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [hasCTA, setCTA] = useState(true);

  useEffect((): void => {
    const refWidth = inputLabel.current ? inputLabel.current.offsetWidth : 0;
    setLabelWidth(refWidth);
  }, []);

  const handleSwitch = event => {
    editPanelField(event, "hascta");
    setCTA(event.target.checked);
  };

  return (
    <Container data-test-id="panel-on">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel shrink ref={inputLabel} htmlFor="layouttype-label">
            Layout type
          </InputLabel>
          <Select
            fullWidth
            onChange={(event: SyntheticInputEvent<HTMLSelectElement>): void =>
              editPanelField(event, "layout")
            }
            value={panelItem && panelItem.layout}
            labelWidth={labelWidth}
            inputProps={{
              id: "layouttype-label"
            }}
          >
            <MenuItem value={ItemTypes.LAYOUT_TYPE.HEADER}>
              Email Header
            </MenuItem>
            <MenuItem value="footer">Email Footer</MenuItem>
            <MenuItem value={ItemTypes.LAYOUT_TYPE.TEMPLATE_MEMBERSHIP}>
              Membership Drive
            </MenuItem>
            <MenuItem value="full-bleed-wrapper">Section Header</MenuItem>
            <MenuItem value={ItemTypes.LAYOUT_TYPE.TEMPLATE_GENERIC}>
              Content: Full width
            </MenuItem>
            <MenuItem value={ItemTypes.LAYOUT_TYPE.TEMPLATE_EVENT}>
              Content: Film Layout #1
            </MenuItem>
            <MenuItem value={ItemTypes.LAYOUT_TYPE.SECTION_BREAK}>
              Section break
            </MenuItem>
          </Select>
        </Grid>
        {panelFieldStatus.content && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              value={panelItem && panelItem.content}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>): void =>
                editPanelField(event, "content")
              }
            />
          </Grid>
        )}
        {panelFieldStatus.htmldescription && (
          <Grid item xs={12}>
            <ReactQuill
              value={panelItem && panelItem.htmldescription}
              modules={{
                blotFormatter: {},
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "link", "image"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"]
                ]
              }}
              onChange={(newValue, delta, source) =>
                editPanelQuill(newValue, source)
              }
            />
          </Grid>
        )}
        {panelFieldStatus.htmlquotes && (
          <Grid item xs={12}>
            <ReactQuill
              value={panelItem && panelItem.htmlquotes}
              modules={{
                blotFormatter: {},
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "link", "image"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"]
                ]
              }}
              onChange={(newValue, delta, source) =>
                editPanelQuill(newValue, source, "htmlquotes")
              }
            />
          </Grid>
        )}
        {panelFieldStatus.posterurl && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Poster thumbnail URL"
              value={panelItem && panelItem.posterurl}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>): void =>
                editPanelField(event, "posterurl")
              }
            />
          </Grid>
        )}
        {panelFieldStatus.bannerurl && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Banner URL"
              value={panelItem && panelItem.bannerurl}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>): void =>
                editPanelField(event, "bannerurl")
              }
            />
          </Grid>
        )}
        {panelFieldStatus.ctalabel && panelFieldStatus.ctaurl && (
          <>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleSwitch}
                    checked={hasCTA}
                    color="primary"
                    value="hasCTA"
                  />
                }
                label="Show CTA Button?"
              />
            </Grid>
            {hasCTA && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CTA button label"
                    value={panelItem && panelItem.ctalabel}
                    onChange={(
                      event: SyntheticInputEvent<HTMLInputElement>
                    ): void => editPanelField(event, "ctalabel")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CTA URL"
                    value={panelItem && panelItem.ctaurl}
                    onChange={(
                      event: SyntheticInputEvent<HTMLInputElement>
                    ): void => editPanelField(event, "ctaurl")}
                  />
                </Grid>
              </>
            )}
          </>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={hidePanel}>
            Save and close this
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PanelOn;
