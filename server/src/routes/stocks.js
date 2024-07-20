// routes/stocks.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/list', stockController.getStockList);
router.get('/analysis/:symbol', stockController.getStockAnalysis);
router.get('/compare', stockController.compareStocks);

module.exports = router;