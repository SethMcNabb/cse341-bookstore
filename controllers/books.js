const { ObjectId } = require("mongodb");
const { getBooksCollection } = require("../models/database");

async function getAllBooks(req, res) {
  try {
    const booksCollection = await getBooksCollection();
    const books = await booksCollection.find({}).toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve books." });
  }
}

async function getBookById(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "The supplied book id is not valid." });
    }

    const booksCollection = await getBooksCollection();
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve the book." });
  }
}

// POST logic
async function createBook(req, res) {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishYear: req.body.publishYear,
      pages: req.body.pages,
    };

    const booksCollection = await getBooksCollection();
    const result = await booksCollection.insertOne(newBook);

    // 201 = successful
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Could not create the book." });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
