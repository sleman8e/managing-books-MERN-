const BooksModel = require('../model/BooksModel');

const createBook = async (req, res) => {
    const { title, author, price, language } = req.body;
    const newBook = new BooksModel({ title, author, price, language });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
};

const getAllBooks = async (req, res) => {
    const books = await BooksModel.find({}, 'title author price language');
    res.status(200).json(books);
};

const getBookById = async (req, res) => {
    const book = await BooksModel.findById(req.params.id, 'title author price language');
    res.status(200).json(book);
};

// Update a book by ID
const updateBookById = async (req, res) => {
    const { title, author, price, language } = req.body;
    const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, { title, author, price, language }, { new: true,runValidators: true });
    res.status(200).json(updatedBook);
};

// Delete a book by ID
const deleteBookById = async (req, res) => {
    await BooksModel.findByIdAndDelete(req.params.id);
    res.status(204).json(); 
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
};

