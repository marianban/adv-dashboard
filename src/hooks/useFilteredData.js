import { useMemo } from 'react';

export const useFilteredData = (dataSources, campaigns, data = []) =>
  useMemo(
    () =>
      data.filter(d => {
        const validDataSource =
          !dataSources.length || dataSources.includes(d.Datasource);
        const validCampaign =
          !campaigns.length || campaigns.includes(d.Campaign);
        return validDataSource && validCampaign;
      }),
    [dataSources, campaigns, data]
  );
