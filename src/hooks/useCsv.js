import { useState, useEffect } from 'react';
import { csv } from 'd3-fetch/src/dsv';

export const useCsv = (url, map = d => d) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        setIsLoading(true);
        const res = await csv(url, map);
        setData(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCsv();
  }, [url, map]);

  return { data, error, isLoading };
};
