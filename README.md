# Sales Leaderboard

Lightweight Express app that collects simple sales records and shows a leaderboard.

## Features

- Submit sales records via web form
- View aggregated leaderboard and basic stats
- Simple, minimal codebase using EJS templates

## Prerequisites

- Node.js 16+ (or compatible)
- npm

## Install

```bash
npm install
```

## Run

- Start the app with Node:

```bash
node server.js
```

- Or use `nodemon` (if installed) for development:

```bash
npx nodemon server.js
```

The app serves HTML pages (EJS). Open http://localhost:3000/ (or the port logged by the server).

## Pages / Endpoints

- `/` — Home page with the form to add a sale (views/index.ejs)
- `/leaderboard` — Leaderboard view showing aggregated sales (views/leaderboard.ejs)

There is a server-side controller under `src/controllers` that handles rendering and form submissions.

## Data persistence

This project currently uses in-memory storage (an array) to store sales records at runtime. Data is stored in `src/services/leaderboardService.js` and will be lost when the server restarts.

## Environment

- This project optionally uses `.env` values (dotenv is a dependency). If you add environment variables, create a `.env` file in the project root.

## Project structure (important files)

- `server.js` — application entry
- `src/app.js` — Express setup
- `src/routes/salesRoutes.js` — route definitions
- `src/controllers/salesController.js` — request handlers
- `src/services/leaderboardService.js` — in-memory data & aggregation logic
- `views/` — EJS templates
- `public/` — static assets (CSS/JS)



