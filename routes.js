const express = require('express');
const router = express.Router();
const pool = require('./db');

// Get all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY date_created DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Add a new blog post
router.post('/blogs', async (req, res) => {
  const { title, content, creator_name, creator_user_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO blogs (title, body, creator_name, creator_user_id, date_created) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
      [title, content, creator_name, creator_user_id]
    );
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

module.exports = router;

// Signup Route
router.post('/signup', async (req, res) => {
  const { user_id, password, name } = req.body;

  try {
    // Basic check
    if (!user_id || !password || !name) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Insert new user
    await pool.query(
      'INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)',
      [user_id, password, name]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE user_id = $1 AND password = $2',
      [user_id, password]
    );

    if (result.rows.length === 1) {
      req.session.user = result.rows[0];
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid user ID or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout Route 
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});
// Update a post
router.put('/blogs/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const user = req.session.user;

  try {
    const result = await pool.query('SELECT * FROM blogs WHERE blog_id = $1', [postId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });

    const post = result.rows[0];
    if (post.creator_user_id !== user.user_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await pool.query(
      'UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3',
      [title, content, postId]
    );

    res.status(200).json({ message: 'Post updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});