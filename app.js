const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const pool = require('./db');
const blogRoutes = require('./routes'); //  API routes (blogs, auth, etc.)

const app = express();

//  CORS: Allow frontend access
app.use(cors({
  origin: 'http://localhost:3000', //  React app URL
  credentials: true               // allow cookies
}));

//  Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Session middleware (stored in PostgreSQL)
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: 'your_secret_key', // change this in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

//  API Routes (e.g., /api/blogs, /api/login)
app.use('/api', blogRoutes);

//  Health check route
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

//  Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});