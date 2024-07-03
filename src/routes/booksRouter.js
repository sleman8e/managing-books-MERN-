const express = require('express');
const router = express.Router();
const booksController = require('../controllers/BooksControllers');


// Route for creating a new book
router.post('/', booksController.createBook);

// Route for getting all books
router.get('/', booksController.getAllBooks);

// Route for getting a book by ID
router.get('/:id', booksController.getBookById);

// Route for updating a book by ID
router.put('/:id', booksController.updateBookById);

// Route for deleting a book by ID
router.delete('/:id', booksController.deleteBookById);

module.exports = router;


