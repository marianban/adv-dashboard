import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { createFilter } from 'react-select';
import { Label } from './Label';
import { Button } from './Button';
import './Sidebar.scss';

export const Sidebar = ({
  dataSourceOptions,
  campaignOptions,
  model,
  onApply
}) => {
  const [state, setState] = useState({
    dataSources: [],
    campaigns: []
  });

  const handleOnChange = useCallback(
    (options, { name }) => {
      setState({ ...model, [name]: (options || []).map(o => o.value) });
    },
    [model]
  );

  const handleOnApply = () => {
    onApply(state);
  };

  return (
    <div className="sidebar">
      <h2>Filter dimension values</h2>
      <Label>
        Data Source
        <Select
          className="select"
          name="dataSources"
          placeholder="All"
          options={dataSourceOptions}
          isMulti={true}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={handleOnChange}
        />
      </Label>
      <Label>
        Campaign
        <Select
          className="select"
          name="campaigns"
          placeholder="All"
          options={campaignOptions}
          isMulti={true}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={handleOnChange}
        />
      </Label>
      <Button onClick={handleOnApply}>Apply</Button>
    </div>
  );
};

const OptionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
});

const Options = PropTypes.arrayOf(OptionShape);

Sidebar.propTypes = {
  dataSourceOptions: Options.isRequired,
  campaignOptions: Options.isRequired,
  onApply: PropTypes.func.isRequired,
  model: PropTypes.shape({
    dataSources: PropTypes.array.isRequired,
    campaigns: PropTypes.array.isRequired
  })
};
