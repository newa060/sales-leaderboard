require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(' Sales Leaderboard Server Started');
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Available Routes:');
  console.log(`  - Homepage: http://localhost:${PORT}/`);
  console.log(`  - Leaderboard: http://localhost:${PORT}/leaderboard`);
  console.log(`  - API Leaderboard: http://localhost:${PORT}/api/leaderboard`);
  console.log(`  - API Add Sale: POST http://localhost:${PORT}/api/sales`);
});