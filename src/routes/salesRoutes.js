const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


// Homepage with form
router.get('/', salesController.renderHome.bind(salesController));

// Leaderboard display page
router.get('/leaderboard', salesController.renderLeaderboard.bind(salesController));

// Handle form submission
router.post('/sales', salesController.addSale.bind(salesController));

// ============= API ROUTES (JSON) =============

// Get leaderboard as JSON
router.get('/api/leaderboard', salesController.getLeaderboardAPI.bind(salesController));

// Add sale via API (JSON)
router.post('/api/sales', salesController.addSaleAPI.bind(salesController));

// Get all raw sales data
router.get('/api/sales', salesController.getAllSalesAPI.bind(salesController));

// Clear all sales (useful for testing)
router.delete('/api/sales', salesController.clearSalesAPI.bind(salesController));

module.exports = router;