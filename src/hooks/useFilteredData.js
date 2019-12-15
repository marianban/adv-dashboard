import { useMemo } from 'react';

export const useFilteredData = (dataSources, campaigns, data = []) =>
  useMemo(
    () =>
      data.filter(d => {
        if (dataSources.length && !dataSources.includes(d.Datasource)) {
          return false;
        }
        if (campaigns.length && !campaigns.includes(d.Campaign)) {
          return false;
        }
        return true;
      }),
    [dataSources, campaigns, data]
  );
