const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.renderHome.bind(salesController));

router.get('/leaderboard', salesController.renderLeaderboard.bind(salesController));

router.post('/sales', salesController.addSale.bind(salesController));


router.get('/api/leaderboard', salesController.getLeaderboardAPI.bind(salesController));

router.post('/api/sales', salesController.addSaleAPI.bind(salesController));

router.get('/api/sales', salesController.getAllSalesAPI.bind(salesController));

router.delete('/api/sales', salesController.clearSalesAPI.bind(salesController));

module.exports = router;