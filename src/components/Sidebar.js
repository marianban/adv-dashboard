import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select, { createFilter } from 'react-select';
import { useDataSourceOptions } from '../hooks/useDataSourceOptions';
import { useCampaignOptions } from '../hooks/useCampaignOptions';
import { Label } from './Label';
import { Button } from './Button';
import './Sidebar.scss';

export const Sidebar = ({ data, onApply }) => {
  const [state, setState] = useState({
    dataSources: [],
    campaigns: []
  });

  const dataSourceOptions = useDataSourceOptions(data);
  const campaignOptions = useCampaignOptions(data, state.dataSources);

  const handleOnChange = (options, { name }) => {
    setState({ ...state, [name]: (options || []).map(o => o.value) });
  };

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

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired
};
