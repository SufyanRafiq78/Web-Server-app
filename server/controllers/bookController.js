// /server/controllers/bookController.js

const { books, getNewBookId } = require('../models/data');

// L I S T (GET /api/books)
exports.listBooks = (req, res) => {
    res.json(books);
};

// D I S P L A Y (GET /api/books/:id)
exports.displayBook = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

// C R E A T E (POST /api/books)
exports.createBook = (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBook = {
        id: getNewBookId(),
        title,
        author,
        year: parseInt(year)
    };
    books.push(newBook);
    res.status(201).json(newBook);
};