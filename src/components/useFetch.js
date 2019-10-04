import { useState, useEffect } from 'react';

export const useFetchOPosts = () => {
  const query = `https://o-cinema.org/wp-json/tribe/events/v1/events?page=1&per_page=20`;
  return useFetch(query, {});
}

export const useFetch = (url, defaultData) => {
  const [data, updateData] = useState(defaultData);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const json = await resp.json();
      updateData(json);
    }
    fetchData();
  }, [url]);

  return data;
}
