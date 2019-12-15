import { useCallback } from 'react';
import { timeParse } from 'd3-time-format';
import { useCsv } from './useCsv';

const parseTime = timeParse('%d.%m.%Y');

export const useData = () => {
  const mapDate = useCallback(d => {
    d.Date = parseTime(d.Date);
    d.Clicks = parseInt(d.Clicks, 10);
    d.Impressions = parseInt(d.Impressions, 10);
    return d;
  }, []);
  return useCsv(
    'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv',
    mapDate
  );
};
