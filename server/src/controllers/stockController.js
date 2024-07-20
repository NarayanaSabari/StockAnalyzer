// stockController.js

const stockService = require('../services/stockService');

exports.getStockList = (req, res) => {
  const stockList = stockService.getStockList();
  res.json(stockList);
};



exports.getStockAnalysis = (req, res) => {
  const { symbol } = req.params;
  const { startDate, endDate, maPeriod, page = 1, pageSize = 100 } = req.query;

    const stockData = stockService.getStockData(symbol);
  
  if (!stockData) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  
  let filteredData = stockService.getStockData(symbol).historicalData;
  
  if (startDate && endDate) {
    filteredData = filteredData.filter(d => d.date >= startDate && d.date <= endDate);
  }

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const analysis = {
    symbol,
    name: stockData.name,
    latestPrice: stockService.getLatestPrice(symbol),
    returns: stockService.calculateReturns(symbol),
    volatility: stockService.calculateVolatility(symbol),
    movingAverage7Days: stockService.getMovingAverage(symbol, 7),
    historicalData: stockData.historicalData,
    rsi: stockService.calculateRSI(symbol),
        macd: stockService.calculateMACD(symbol),
    bollingerBands: stockService.calculateBollingerBands(symbol),
    historicalData: filteredData,
    news: stockService.getStockNews(symbol),
   historicalData: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize
    } 
  };

  res.json(analysis);
};

// exports.getStockAnalysis = (req, res) => {
//   const { symbol } = req.params;
//   const { startDate, endDate } = req.query;
//   const stockData = stockService.getStockData(symbol);
  
//   if (!stockData) {
//     return res.status(404).json({ error: 'Stock not found' });
//   }

//   let filteredData = stockData.historicalData;
//   if (startDate && endDate) {
//     filteredData = filteredData.filter(d => d.date >= startDate && d.date <= endDate);
//   }

//   const analysis = {
//     symbol,
//     name: stockData.name,
//     latestPrice: stockService.getLatestPrice(symbol),
//     returns: stockService.calculateReturns(symbol),
//     volatility: stockService.calculateVolatility(symbol),
//     movingAverage7Days: stockService.getMovingAverage(symbol, 7),
//     rsi: stockService.calculateRSI(symbol),
//     macd: stockService.calculateMACD(symbol),
//     bollingerBands: stockService.calculateBollingerBands(symbol),
//     historicalData: filteredData,
//     news: stockService.getStockNews(symbol)
//   };

//   res.json(analysis);
// };

exports.compareStocks = (req, res) => {
  const { symbols } = req.query;
  const stockSymbols = symbols.split(',');

  const comparison = stockSymbols.map(symbol => {
    const stockData = stockService.getStockData(symbol);
    return {
      symbol,
      name: stockData.name,
      latestPrice: stockService.getLatestPrice(symbol),
      returns: stockService.calculateReturns(symbol),
      rsi: stockService.calculateRSI(symbol)
    };
  });

  res.json(comparison);
};

