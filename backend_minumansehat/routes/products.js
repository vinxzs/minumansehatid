// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Mengimpor koneksi MySQL dari db.js

// Ambil semua produk dari tabel minuman
router.get('/', (req, res) => {
  db.query('SELECT * FROM minuman', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching products' });
    }
    res.json(results);
  });
});

// Tambah produk baru ke tabel minuman
router.post('/', (req, res) => {
  const { name, price, category } = req.body;
  db.query(
    'INSERT INTO minuman (name, price, category) VALUES (?, ?, ?)', // Menggunakan tabel minuman
    [name, price, category],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding product' });
      }
      res.status(201).json({ id: results.insertId, name, price, category });
    }
  );
});

// Hapus produk berdasarkan ID dari tabel minuman
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM minuman WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting product' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  });
});

module.exports = router;
