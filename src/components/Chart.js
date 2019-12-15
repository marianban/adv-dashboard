import React, { useRef, useEffect } from 'react';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { D3Chart } from './D3Chart';
import './Chart.scss';

export const Chart = ({ data }) => {
  const d3ChartRef = useRef();
  const [ref, dimensions] = useChartDimensions();

  useEffect(() => {
    d3ChartRef.current = new D3Chart(ref.current);
  }, [ref]);

  useEffect(() => {
    d3ChartRef.current.update(dimensions, data);
  }, [dimensions, data]);

  return <div ref={ref} className="chart"></div>;
};
