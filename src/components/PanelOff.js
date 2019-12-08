// @flow
import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExportTemplate from "./ExportTemplate";
import { useFetchOPosts } from "./useFetch";

type ComponentType = {
  actions: { createLayoutItem: Function, exportAsHTML: Function },
  layout: NewsletterLayoutType
};

/**
 * Contains redux methods in containers/PanelOffContainer.js
 **/
const PanelOff = ({
  layout,
  actions
}: ComponentType): React$Element<({ children?: React$Node }) => React$Node> => {
  const { createLayoutItem, exportAsHTML } = actions;
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [values, setValues] = useState("");

  useEffect((): void => {
    const refWidth = inputLabel.current ? inputLabel.current.offsetWidth : 0;
    setLabelWidth(refWidth);
  }, []);

  const response = useFetchOPosts();

  const handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setValues(value);
  };

  const handleImport = (): void => {
    if (!values) return;

    let searchedfilm = response.events.filter(
      (film: NewsletterLayoutItemType): boolean => film.id === values
    );
    searchedfilm = searchedfilm[0];

    let temp = {
      id: searchedfilm.id,
      layout: "filmlayout",
      content: searchedfilm.title,
      htmldescription: searchedfilm.description,
      htmlquotes: searchedfilm.event_reviews,
      posterurl: searchedfilm["image"]["sizes"]["poster-full"]["url"],
      showtimes: searchedfilm.event_showtimes,
      hascta: true,
      ctalabel: "Purchase tickets",
      ctaurl: searchedfilm.url,
      bannerurl: ""
    };
    createLayoutItem(temp);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h6">
            Components
          </Typography>
        </Grid>
        <Button variant="contained" onClick={(): void => createLayoutItem()}>
          Full Width
        </Button>
        <Button variant="contained">Event</Button>
        <Button variant="contained">Partner</Button>
        <Button variant="contained">Section Header</Button>
        <Button variant="contained">Section Break</Button>

        <Grid item xs={12}>
          <Typography component="h2" variant="h6">
            Import from the website
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel ref={inputLabel} htmlFor="event-label">
              Event
            </InputLabel>
            <Select
              value={values}
              onChange={handleChange}
              labelWidth={labelWidth}
              inputProps={{
                id: "event-label"
              }}
            >
              <MenuItem value="">
                <em>Choose an event</em>
              </MenuItem>
              {response.events &&
                response.events.map((film: WebsiteEventAPIType): React$Element<
                  typeof MenuItem
                > => (
                  <MenuItem key={film.id} value={film.id}>
                    {film.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            disabled={!response || values === ""}
            onClick={handleImport}
            style={{ marginTop: 12 }}
            variant="contained"
          >
            Import
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ExportTemplate exportAsHTML={exportAsHTML} layout={layout} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PanelOff;
