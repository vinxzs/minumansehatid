const express = require('express');
const mysql = require('mysql');
const app = express();

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Sesuaikan dengan username MySQL Anda
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'minumansehat' // Nama database Anda
});

// Menghubungkan ke MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing produk
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Menjalankan server pada port 3001
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM minuman', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching products' });
      }
      res.json(results);  // Mengirimkan data produk
    });
  });
  
