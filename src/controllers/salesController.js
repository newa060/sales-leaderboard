const leaderboardService = require('../services/leaderboardService');

class SalesController {
  renderHome(req, res) {
    try {
      const stats = leaderboardService.getStats();
      res.render('index', { 
        title: 'Sales Leaderboard System',
        stats: stats,
        message: req.query.message || null,
        error: req.query.error || null
      });
    } catch (error) {
      console.error('Error rendering home:', error);
      res.status(500).render('index', { 
        title: 'Sales Leaderboard System',
        stats: { totalAgents: 0, totalSalesAmount: 0, totalNumberOfDeals: 0, totalRecords: 0 },
        message: null,
        error: 'An error occurred'
      });
    }
  }

  renderLeaderboard(req, res) {
    try {
      const leaderboard = leaderboardService.getLeaderboard();
      const stats = leaderboardService.getStats();
      
      res.render('leaderboard', { 
        title: 'Sales Leaderboard',
        leaderboard: leaderboard,
        stats: stats,
        req: req
      });
    } catch (error) {
      console.error('Error rendering leaderboard:', error);
      res.status(500).json({
        success: false,
        error: 'Error loading leaderboard'
      });
    }
  }


  addSale(req, res) {
    try {
      const { agentName, amountSold, numberOfSales } = req.body;

      const amount = parseFloat(amountSold);
      const count = parseInt(numberOfSales);

   
      leaderboardService.addSale(agentName, amount, count);

    
      res.redirect('/?message=Sale added successfully!');
    } catch (error) {
      console.error('Error adding sale:', error);
      res.redirect(`/?error=${encodeURIComponent(error.message)}`);
    }
  }

  getLeaderboardAPI(req, res) {
    try {
      const leaderboard = leaderboardService.getLeaderboard();
      const stats = leaderboardService.getStats();

      res.json({
        success: true,
        data: {
          leaderboard: leaderboard,
          stats: stats
        }
      });
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  addSaleAPI(req, res) {
    try {
      const { agentName, amountSold, numberOfSales } = req.body;

      if (!agentName || amountSold === undefined || numberOfSales === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: agentName, amountSold, numberOfSales'
        });
      }

      const sale = leaderboardService.addSale(agentName, amountSold, numberOfSales);

      res.status(201).json({
        success: true,
        message: 'Sale added successfully',
        data: sale
      });
    } catch (error) {
      console.error('Error adding sale:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  clearSalesAPI(req, res) {
    try {
      leaderboardService.clearAllSales();
      
      res.json({
        success: true,
        message: 'All sales data cleared successfully'
      });
    } catch (error) {
      console.error('Error clearing sales:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  getAllSalesAPI(req, res) {
    try {
      const sales = leaderboardService.getAllSales();
      
      res.json({
        success: true,
        data: sales
      });
    } catch (error) {
      console.error('Error getting sales:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new SalesController();