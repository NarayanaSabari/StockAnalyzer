// stockService.js

const stocks = {
  AAPL: {
    name: 'Apple Inc.',
    historicalData: [
      { date: '2024-07-01', price: 150.10, volume: 28_700_000 },
      { date: '2024-07-02', price: 152.30, volume: 30_200_000 },
      { date: '2024-07-03', price: 151.50, volume: 25_600_000 },
      { date: '2024-07-04', price: 153.80, volume: 27_900_000 },
      { date: '2024-07-05', price: 155.20, volume: 32_100_000 },
      { date: '2024-07-06', price: 154.90, volume: 29_800_000 },
      { date: '2024-07-07', price: 156.40, volume: 31_500_000 },
    ]
  },
  GOOGL: {
    name: 'Alphabet Inc.',
    historicalData: [
      { date: '2024-07-01', price: 2700.50, volume: 1_200_000 },
      { date: '2024-07-02', price: 2715.80, volume: 1_350_000 },
      { date: '2024-07-03', price: 2705.20, volume: 1_100_000 },
      { date: '2024-07-04', price: 2720.10, volume: 1_250_000 },
      { date: '2024-07-05', price: 2735.60, volume: 1_450_000 },
      { date: '2024-07-06', price: 2730.90, volume: 1_300_000 },
      { date: '2024-07-07', price: 2745.30, volume: 1_400_000 },
    ]
  },
  MSFT: {
    name: 'Microsoft Corporation',
    historicalData: [
      { date: '2024-07-01', price: 280.20, volume: 22_500_000 },
      { date: '2024-07-02', price: 282.50, volume: 24_100_000 },
      { date: '2024-07-03', price: 281.80, volume: 20_800_000 },
      { date: '2024-07-04', price: 284.30, volume: 23_200_000 },
      { date: '2024-07-05', price: 286.70, volume: 25_700_000 },
      { date: '2024-07-06', price: 285.90, volume: 23_900_000 },
      { date: '2024-07-07', price: 288.40, volume: 24_800_000 },
    ]
  },
  AMZN: {
    name: 'Amazon.com Inc.',
    historicalData: [
      { date: '2024-07-01', price: 3400.00, volume: 3_500_000 },
      { date: '2024-07-02', price: 3420.10, volume: 3_700_000 },
      { date: '2024-07-03', price: 3410.50, volume: 3_200_000 },
      { date: '2024-07-04', price: 3430.70, volume: 3_600_000 },
      { date: '2024-07-05', price: 3445.80, volume: 3_900_000 },
      { date: '2024-07-06', price: 3438.20, volume: 3_500_000 },
      { date: '2024-07-07', price: 3455.90, volume: 3_800_000 },
    ]
  },
  TSLA: {
    name: 'Tesla Inc.',
    historicalData: [
      { date: '2024-07-01', price: 800.00, volume: 10_500_000 },
      { date: '2024-07-02', price: 810.20, volume: 11_200_000 },
      { date: '2024-07-03', price: 805.50, volume: 9_800_000 },
      { date: '2024-07-04', price: 815.70, volume: 10_700_000 },
      { date: '2024-07-05', price: 820.30, volume: 11_500_000 },
      { date: '2024-07-06', price: 818.20, volume: 10_800_000 },
      { date: '2024-07-07', price: 825.40, volume: 11_300_000 },
    ]
  },
  NFLX: {
    name: 'Netflix Inc.',
    historicalData: [
      { date: '2024-07-01', price: 600.50, volume: 8_200_000 },
      { date: '2024-07-02', price: 610.30, volume: 8_500_000 },
      { date: '2024-07-03', price: 605.40, volume: 7_900_000 },
      { date: '2024-07-04', price: 615.20, volume: 8_300_000 },
      { date: '2024-07-05', price: 620.50, volume: 8_700_000 },
      { date: '2024-07-06', price: 618.40, volume: 8_100_000 },
      { date: '2024-07-07', price: 625.30, volume: 8_500_000 },
    ]
  },
  FB: {
    name: 'Meta Platforms Inc.',
    historicalData: [
      { date: '2024-07-01', price: 350.10, volume: 12_000_000 },
      { date: '2024-07-02', price: 355.20, volume: 12_500_000 },
      { date: '2024-07-03', price: 352.80, volume: 11_800_000 },
      { date: '2024-07-04', price: 358.40, volume: 12_300_000 },
      { date: '2024-07-05', price: 360.90, volume: 13_000_000 },
      { date: '2024-07-06', price: 359.20, volume: 12_400_000 },
      { date: '2024-07-07', price: 362.50, volume: 12_800_000 },
    ]
  },
  NVDA: {
    name: 'NVIDIA Corporation',
    historicalData: [
      { date: '2024-07-01', price: 750.50, volume: 6_500_000 },
      { date: '2024-07-02', price: 760.30, volume: 6_800_000 },
      { date: '2024-07-03', price: 755.40, volume: 6_200_000 },
      { date: '2024-07-04', price: 765.20, volume: 6_600_000 },
      { date: '2024-07-05', price: 770.50, volume: 7_000_000 },
      { date: '2024-07-06', price: 768.40, volume: 6_500_000 },
      { date: '2024-07-07', price: 775.30, volume: 6_800_000 },
    ]
  }
};

exports.getStockList = () => {
  return Object.keys(stocks).map(symbol => ({
    symbol,
    name: stocks[symbol].name
  }));
};

exports.getStockData = (symbol) => {
  return stocks[symbol];
};

exports.getLatestPrice = (symbol) => {
  const data = stocks[symbol].historicalData;
  return data[data.length - 1].price;
};

exports.calculateReturns = (symbol) => {
  const data = stocks[symbol].historicalData;
  const oldestPrice = data[0].price;
  const latestPrice = data[data.length - 1].price;
  return (latestPrice - oldestPrice) / oldestPrice * 100;
};

exports.calculateVolatility = (symbol) => {
  const data = stocks[symbol].historicalData;
  const prices = data.map(d => d.price);
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length;
  return Math.sqrt(variance);
};

exports.getMovingAverage = (symbol, days) => {
  const data = stocks[symbol].historicalData;
  const prices = data.slice(-days).map(d => d.price);
  return prices.reduce((sum, price) => sum + price, 0) / days;
};

// Add this function to stockService.js
exports.calculateRSI = (symbol, period = 14) => {
  const data = stocks[symbol].historicalData;
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < data.length; i++) {
    const difference = data[i].price - data[i-1].price;
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));

  return rsi;
};

exports.calculateMACD = (symbol, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) => {
  const data = stocks[symbol].historicalData;
  const prices = data.map(d => d.price);
  
  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  
  const macdLine = shortEMA.map((short, i) => short - longEMA[i]);
  const signalLine = calculateEMA(macdLine, signalPeriod);
  
  return {
    macdLine: macdLine[macdLine.length - 1],
    signalLine: signalLine[signalLine.length - 1],
    histogram: macdLine[macdLine.length - 1] - signalLine[signalLine.length - 1]
  };
};

exports.calculateBollingerBands = (symbol, period = 20, multiplier = 2) => {
  const data = stocks[symbol].historicalData;
  const prices = data.map(d => d.price);
  
  const sma = calculateSMA(prices, period);
  const stdDev = calculateStandardDeviation(prices, period);
  
  const upperBand = sma + (multiplier * stdDev);
  const lowerBand = sma - (multiplier * stdDev);
  
  return { sma, upperBand, lowerBand };
};

exports.getStockNews = (symbol) => {
  // In a real scenario, you would fetch news from an API
  // For this example, we'll return mock data
  return [
    { title: `${symbol} Reports Strong Q2 Earnings`, date: '2024-07-15' },
    { title: `Analyst Upgrades ${symbol} to "Buy"`, date: '2024-07-14' },
    { title: `${symbol} Announces New Product Launch`, date: '2024-07-13' }
  ];
};

// Helper functions
function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let ema = data[0];
  return data.map((price, i) => {
    ema = price * k + ema * (1 - k);
    return ema;
  });
}

function calculateSMA(data, period) {
  return data.slice(-period).reduce((sum, price) => sum + price, 0) / period;
}

function calculateStandardDeviation(data, period) {
  const mean = calculateSMA(data, period);
  const squaredDiffs = data.slice(-period).map(price => Math.pow(price - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((sum, diff) => sum + diff, 0) / period);
}

// Add a function to get data for different chart types
exports.getChartData = (symbol, chartType) => {
  const data = stocks[symbol].historicalData;
  switch(chartType) {
    case 'line':
      return data.map(d => ({ date: d.date, price: d.close }));
    case 'candlestick':
      return data;
    case 'area':
      return data.map(d => ({ date: d.date, price: d.close }));
    default:
      return data;
  }
};