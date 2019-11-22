// @flow
import {useState, useEffect} from "react";

export const useFetchOPosts = (): any | {[key: string]: any} => {
  const query = `https://o-cinema.org/wp-json/tribe/events/v1/events?page=1&per_page=20`;
  return useFetch(query, {});
};

export const useFetch = (
  url: string,
  defaultData: {[key: string]: any}
): any | {[key: string]: any} => {
  const [data, updateData] = useState(defaultData);

  useEffect((): void => {
    async function fetchData(): Promise<void> {
      const resp = await fetch(url);
      const json = await resp.json();
      updateData(json);
    }
    fetchData();
  }, [url]);

  return data;
};
