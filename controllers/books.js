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
      return res.status(400).json({ message: "The supplied book id is not valid." });
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

async function createBook(req, res) {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishYear: Number(req.body.publishYear),
      pages: Number(req.body.pages),
    };

    const booksCollection = await getBooksCollection();
    const result = await booksCollection.insertOne(newBook);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Could not create the book." });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "The supplied book id is not valid." });
    }

    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishYear: Number(req.body.publishYear),
      pages: Number(req.body.pages),
    };

    const booksCollection = await getBooksCollection();
    const result = await booksCollection.replaceOne({ _id: new ObjectId(id) }, updatedBook);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Could not update the book." });
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "The supplied book id is not valid." });
    }

    const booksCollection = await getBooksCollection();
    const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the book." });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};