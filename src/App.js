import React, { useState } from 'react';
import './App.scss';
import { Sidebar } from './components/Sidebar';
import { Loader } from './components/Loader';
import { useData } from './hooks/useData';
import { useFilteredData } from './hooks/useFilteredData';
import { Chart } from './components/Chart';

function App() {
  const { data, isLoading, error } = useData();
  const [state, setState] = useState({
    dataSources: [],
    campaigns: []
  });
  const { dataSources, campaigns } = state;

  const filteredValues = useFilteredData(dataSources, campaigns, data);
  const handleOnApply = model => {
    setState(model);
  };

  if (error) {
    return <div>Unexpected error ocurred. Please refresh your page.</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Sidebar data={data} onApply={handleOnApply} />
      <Chart data={filteredValues} />
    </div>
  );
}

export default App;
