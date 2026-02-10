class LeaderboardService {
  constructor() {
    this.salesData = [];
  }

  addSale(agentName, amountSold, numberOfSales) {
    // Validate input
    if (!agentName || typeof agentName !== 'string' || agentName.trim() === '') {
      throw new Error('Agent name is required and must be a non-empty string');
    }

    if (typeof amountSold !== 'number' || amountSold < 0) {
      throw new Error('Amount sold must be a non-negative number');
    }

    if (typeof numberOfSales !== 'number' || numberOfSales < 1 || !Number.isInteger(numberOfSales)) {
      throw new Error('Number of sales must be a positive integer');
    }

    const sale = {
      agentName: agentName.trim(),
      amountSold: parseFloat(amountSold),
      numberOfSales: parseInt(numberOfSales),
      timestamp: new Date()
    };

    this.salesData.push(sale);
    return sale;
  }

  aggregateSales() {
    const aggregated = {};

    // Group sales by agent name
    this.salesData.forEach(sale => {
      const name = sale.agentName;
      
      if (!aggregated[name]) {
        aggregated[name] = {
          agentName: name,
          totalSales: 0,
          totalDeals: 0
        };
      }

      aggregated[name].totalSales += sale.amountSold;
      aggregated[name].totalDeals += sale.numberOfSales;
    });

    // Convert to array
    return Object.values(aggregated);
  }


  getLeaderboard() {
    // Get aggregated data
    const aggregated = this.aggregateSales();

    // Sort by total sales (descending)
    aggregated.sort((a, b) => b.totalSales - a.totalSales);

    // Assign ranks (handle ties properly)
    let currentRank = 1;
    const leaderboard = [];

    for (let i = 0; i < aggregated.length; i++) {

      if (i > 0 && aggregated[i].totalSales !== aggregated[i - 1].totalSales) {
        currentRank = i + 1;
      }

      leaderboard.push({
        rank: currentRank,
        agentName: aggregated[i].agentName,
        totalSales: aggregated[i].totalSales,
        totalDeals: aggregated[i].totalDeals
      });
    }

    return leaderboard;
  }

  getAllSales() {
    return this.salesData;
  }

  clearAllSales() {
    this.salesData = [];
  }

  getStats() {
    const leaderboard = this.getLeaderboard();
    const totalSales = leaderboard.reduce((sum, agent) => sum + agent.totalSales, 0);
    const totalDeals = leaderboard.reduce((sum, agent) => sum + agent.totalDeals, 0);

    return {
      totalAgents: leaderboard.length,
      totalSalesAmount: totalSales,
      totalNumberOfDeals: totalDeals,
      totalRecords: this.salesData.length
    };
  }
}

module.exports = new LeaderboardService();