// @flow
import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExportTemplate from "./ExportTemplate";
import { useFetchOPosts } from "./useFetch";

type ComponentType = {
  createLayoutItem: Function,
  exportAsHTML: Function,
  layout: NewsletterLayoutType
};

const PanelOff = ({
  createLayoutItem,
  exportAsHTML,
  layout
}: ComponentType): React$Element<({ children?: React$Node }) => React$Node> => {
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
      posterurl: searchedfilm.image.sizes.large.url,
      showtimes: searchedfilm.event_showtimes,
      agileurl: searchedfilm.url,
      bannerurl: ""
    };
    createLayoutItem(temp);
  };

  return (
    <>
      <Button variant="contained" onClick={(): void => createLayoutItem()}>
        Add a blank section
      </Button>

      <Typography>Import from the website:</Typography>
      <InputLabel ref={inputLabel} htmlFor="event-label">
        Event
      </InputLabel>
      <Select
        value={values}
        onChange={handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: "age",
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
      <Button
        variant="contained"
        disabled={!response || values === ""}
        onClick={handleImport}
      >
        Import
      </Button>
      <ExportTemplate exportAsHTML={exportAsHTML} layout={layout} />
    </>
  );
};

export default PanelOff;
