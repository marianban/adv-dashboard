import { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';

export const useCampaignOptions = (data, dataSources) =>
  useMemo(() => {
    const filtered = data.filter(
      d => !dataSources.length || dataSources.includes(d.Datasource)
    );
    return uniqBy(filtered, d => d.Campaign).map(d => ({
      value: d.Campaign,
      label: d.Campaign
    }));
  }, [data, dataSources]);
