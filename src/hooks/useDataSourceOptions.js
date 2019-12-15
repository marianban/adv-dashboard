import { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';

export const useDataSourceOptions = data =>
  useMemo(() => {
    return uniqBy(data, d => d.Datasource).map(d => ({
      value: d.Datasource,
      label: d.Datasource
    }));
  }, [data]);
