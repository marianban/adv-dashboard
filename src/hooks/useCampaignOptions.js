import { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';

export const useCampaignOptions = data =>
  useMemo(() => {
    return uniqBy(data, d => d.Campaign).map(d => ({
      value: d.Campaign,
      label: d.Campaign
    }));
  }, [data]);
