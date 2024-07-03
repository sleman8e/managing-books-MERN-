const db = require('./db');
const cors = require('cors');
const express = require('express');
const booksRouter = require('./routes/booksRouter'); // Corrected path
const AdminRouter = require('./routes/AdminRouter'); // Corrected path


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', booksRouter);

app.use('/admins', AdminRouter);

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
