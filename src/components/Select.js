import React from 'react';
import ReactSelect, { createFilter } from 'react-select';

export const Select = props => (
  <ReactSelect
    className="select"
    /* performance optimization mentioned in https://github.com/JedWatson/react-select/issues/3128 */
    filterOption={createFilter({ ignoreAccents: false })}
    {...props}
  />
);
