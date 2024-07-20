import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data, chartType }) => {
  if (!data || data.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  const ChartType = chartType === 'line' ? LineChart : chartType === 'area' ? AreaChart : BarChart;
  const DataComponent = chartType === 'volume' ? Bar : chartType === 'area' ? Area : Line;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ChartType data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <YAxis 
          yAxisId="left"
          domain={['auto', 'auto']}
          tick={{ fontSize: 12 }}
        />
        {chartType === 'volume' && (
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
          />
        )}
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'Price') {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value);
            }
            return new Intl.NumberFormat('en-US').format(value);
          }}
        />
        <Legend />
        <DataComponent 
          type="monotone" 
          dataKey={chartType === 'volume' ? 'volume' : 'price'} 
          stroke="#8884d8" 
          fill={chartType === 'area' ? '#8884d8' : '#82ca9d'} 
          name={chartType === 'volume' ? 'Volume' : 'Price'} 
          yAxisId="left"
        />
        {chartType === 'volume' && (
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#ff7300" 
            name="Price" 
            yAxisId="right"
          />
        )}
      </ChartType>
    </ResponsiveContainer>
  );
};

export default ChartComponent;