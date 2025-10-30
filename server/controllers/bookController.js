// /server/controllers/bookController.js

// Require the models
const db = require('../models');
const Book = db.Book;

// L I S T (GET /api/books)
exports.listBooks = async (req, res) => {
    try {
        // Use Sequelize to find all records
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
};

// D I S P L A Y (GET /api/books/:id)
exports.displayBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Use Sequelize to find by Primary Key (ID)
        const book = await Book.findByPk(id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
};

// C R E A T E (POST /api/books)
exports.createBook = async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Use Sequelize to create a new record
        const newBook = await Book.create({
            title,
            author,
            year: parseInt(year) // Ensure year is an integer
        });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};