const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();


// Enable CORS for API access
app.use(cors());

// Parse JSON bodies (for API requests)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

const salesRoutes = require('./routes/salesRoutes');
app.use('/', salesRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        h1 { font-size: 72px; margin: 0; }
        p { font-size: 24px; }
        a { color: #fff; text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/">Go to Homepage</a>
    </body>
    </html>
  `);
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

module.exports = app;