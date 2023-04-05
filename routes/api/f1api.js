const express = require('express');
const port = 3000;
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'F1_2020',
    password: 'Jspezza#19!',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// GET route to retrieve all F1 teams from the database
app.get('/teams', async (req, res) => {
  try {
    // Use the pool to acquire a new client
    const client = await pool.connect();
    // Execute the SQL query to retrieve all F1 teams
    const result = await client.query('SELECT * FROM f1_teams');
    // Release the client back to the pool
    client.release();
    // Send the retrieved data as a response to the client
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET a single F1 team by ID
app.get('/teams/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM teams WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows[0]);
  });
});

// PUT route to update an existing F1 team in the database
app.put('/teams/:id', async (req, res) => {
  const id = req.params.id;
  const { name, country, engine } = req.body;
  try {
    // Use the pool to acquire a new client
    const client = await pool.connect();
    // Execute the SQL query to update an existing F1 team
    const result = await client.query(
      'UPDATE teams SET name = $1, country = $2, engine = $3 WHERE id = $4',
      [name, country, engine, id]
    );
    // Release the client back to the pool
    client.release();
    // Send a success message as a response to the client
    res.send(`Team ${name} updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE route to delete an existing F1 team from the database
app.delete('/api/teams/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Use the pool to acquire a new client
    const client = await pool.connect();
    // Execute the SQL query to delete an existing F1 team
    const result = await client.query('DELETE FROM teams WHERE id = $1', [id]);
    // Release the client back to the pool
    client.release();
    // Send a success message as a response to the client
    res.send(`Team ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status
  }})

  // GET all drivers
  app.get('/drivers', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM f1_drivers');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  // GET driver by ID
  app.get('/api/drivers/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('SELECT * FROM f1_drivers WHERE id = $1', [id]);
      if (rows.length === 0) {
        res.status(404).send('Driver not found');
      } else {
        res.send(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  // POST a new driver
  app.post('/drivers', async (req, res) => {
    try {
      const { name, nationality, team_id } = req.body;
      const { rows } = await pool.query('INSERT INTO f1_drivers (name, nationality, team_id) VALUES ($1, $2, $3) RETURNING *', [name, nationality, team_id]);
      res.send(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  // PUT an existing driver
  app.put('/drivers/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nationality, team_id } = req.body;
      const { rows } = await pool.query('UPDATE f1_drivers SET name = $1, nationality = $2, team_id = $3 WHERE id = $4 RETURNING *', [name, nationality, team_id, id]);
      if (rows.length === 0) {
        res.status(404).send('Driver not found');
      } else {
        res.send(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  // DELETE an existing driver
  app.delete('/drivers/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('DELETE FROM f1_drivers WHERE id = $1 RETURNING *', [id]);
      if (rows.length === 0) {
        res.status(404).send('Driver not found');
      } else {
        res.send(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

// GET all principals
app.get('/principals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_principals');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET a principal by id
app.get('/principals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM team_principals WHERE id = $1', [id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Principal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CREATE a new principal
app.post('/newprincipals', async (req, res) => {
  try {
    const { first_name, last_name, nationality, team_id } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO team_principals (first_name, last_name, nationality, team_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, nationality, team_id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE a principal by id
app.put('/principals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, nationality, team_id } = req.body;
    const { rows } = await pool.query(
      'UPDATE team_principals SET first_name = $1, last_name = $2, nationality = $3, team_id = $4 WHERE id = $5 RETURNING *',
      [first_name, last_name, nationality, team_id, id]
    );
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Principal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a principal by id
app.delete('/principals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM team_principals WHERE id = $1 RETURNING *', [id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Principal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  app.listen(port)