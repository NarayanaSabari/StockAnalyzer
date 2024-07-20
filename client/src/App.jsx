import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FixedSizeList as List } from 'react-window';
import ChartComponent from './components/ChartComponent';

function App() {
  const [stockList, setStockList] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [maPeriod, setMaPeriod] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/stocks/list');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStockList(data);
    } catch (error) {
      console.error('Error fetching stock list:', error);
      setError('Failed to fetch stock list. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStockList();
  }, [fetchStockList]);

  const fetchAnalysis = useCallback(async (symbol) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(`http://localhost:3000/api/stocks/analysis/${symbol}`);
      url.searchParams.append('startDate', dateRange.start?.toISOString() || '');
      url.searchParams.append('endDate', dateRange.end?.toISOString() || '');
      url.searchParams.append('maPeriod', maPeriod.toString());
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('pageSize', pageSize.toString());

      const response = await fetch(url);
      console.log('Analysis Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Analysis Data:', data);
      setAnalysis(data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setError('Failed to fetch stock analysis. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, maPeriod, currentPage, pageSize]);

  const fetchComparison = useCallback(async (symbols) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/stocks/compare?symbols=${symbols.join(',')}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComparison(data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
      setError('Failed to fetch stock comparison. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedStocks.length > 0) {
      fetchAnalysis(selectedStocks[0].symbol);
      if (selectedStocks.length > 1) {
        fetchComparison(selectedStocks.map(stock => stock.symbol));
      } else {
        setComparison(null);
      }
    } else {
      setAnalysis(null);
      setComparison(null);
    }
  }, [selectedStocks, fetchAnalysis, fetchComparison]);

  const handleStockSelect = (stock) => {
    setSelectedStocks(prev => {
      const isSelected = prev.find(s => s.symbol === stock.symbol);
      if (isSelected) {
        return prev.filter(s => s.symbol !== stock.symbol);
      } else {
        return [...prev, stock];
      }
    });
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ start, end });
  };

  const handleMaPeriodChange = (event) => {
    setMaPeriod(parseInt(event.target.value));
  };



  const Row = ({ index, style }) => {
    const item = analysis?.historicalData[index];
    return (
      <div style={style}>
        {item ? `${item.date}: $${item.price}` : 'Loading...'}
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stock Analysis</h1>
      
      <div className="mb-4 flex flex-wrap gap-2">
        <DatePicker
          selectsRange={true}
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={handleDateRangeChange}
          isClearable={true}
          className="border p-2 rounded"
        />
        <Input
          type="number"
          value={maPeriod}
          onChange={handleMaPeriodChange}
          min="1"
          max="200"
          placeholder="MA Period"
          className="w-32"
        />
        <Input
          type="number"
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
          min="10"
          max="1000"
          placeholder="Page Size"
          className="w-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Stock List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stockList.map((stock) => (
                <Button
                  key={stock.symbol}
                  onClick={() => handleStockSelect(stock)}
                  variant={selectedStocks.find(s => s.symbol === stock.symbol) ? "default" : "outline"}
                >
                  {stock.symbol}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>{analysis.name} ({analysis.symbol}) Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Latest Price: ${analysis.latestPrice.toFixed(2)}</p>
              <p>Returns: {analysis.returns.toFixed(2)}%</p>
              <p>Volatility: {analysis.volatility.toFixed(2)}</p>
              <p>{maPeriod}-Day Moving Average: ${analysis.movingAverage7Days.toFixed(2)}</p>
              <p>RSI (14-day): {analysis.rsi.toFixed(2)}</p>
              <p>MACD: {analysis.macd.macdLine.toFixed(2)}</p>
              <p>Signal Line: {analysis.macd.signalLine.toFixed(2)}</p>
              <p>Histogram: {analysis.macd.histogram.toFixed(2)}</p>
              <p>Bollinger Bands:</p>
              <ul>
                <li>Upper: ${analysis.bollingerBands.upperBand.toFixed(2)}</li>
                <li>Middle: ${analysis.bollingerBands.sma.toFixed(2)}</li>
                <li>Lower: ${analysis.bollingerBands.lowerBand.toFixed(2)}</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      
{analysis && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Price and Volume History</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              className="mb-4 p-2 border rounded"
            >
              <option value="line">Line Chart</option>
              <option value="area">Area Chart</option>
              <option value="volume">Volume Chart</option>
            </select>
            <ChartComponent data={analysis.historicalData} chartType={chartType} />
          </CardContent>
        </Card>
      )}

      {comparison && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Stock Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Symbol</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Latest Price</th>
                    <th className="px-4 py-2">Returns</th>
                    <th className="px-4 py-2">RSI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((stock) => (
                    <tr key={stock.symbol}>
                      <td className="border px-4 py-2">{stock.symbol}</td>
                      <td className="border px-4 py-2">{stock.name}</td>
                      <td className="border px-4 py-2">${stock.latestPrice.toFixed(2)}</td>
                      <td className="border px-4 py-2">{stock.returns.toFixed(2)}%</td>
                      <td className="border px-4 py-2">{stock.rsi.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Historical Data</CardTitle>
          </CardHeader>
          <CardContent>
            <List
              height={400}
              itemCount={analysis.historicalData?.length || 0}
              itemSize={35}
              width={300}
            >
              {Row}
            </List>
          </CardContent>
        </Card>
      )}

      {analysis?.news && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {analysis.news.map((item, index) => (
                <li key={index} className="mb-2">
                  <p><strong>{item.date}:</strong> {item.title}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {analysis?.pagination && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {analysis.pagination.totalPages}</span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(analysis.pagination.totalPages, prev + 1))}
            disabled={currentPage === analysis.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;