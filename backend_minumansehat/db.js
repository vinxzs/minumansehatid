
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Sesuaikan dengan username MySQL Anda
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'minumansehat' // Nama database Anda
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db; // Pastikan db diexport agar bisa di-import di file lain
