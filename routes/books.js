const routes = require("express").Router();
const booksController = require("../controllers/books");

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books from the database
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
routes.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a specific book by its unique identifier
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       '200':
 *         description: A single book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
routes.get("/:id", booksController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Add a new book to the database
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: The book was successfully created
 */
routes.post("/", booksController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book (Placeholder)
 *     description: This route will eventually update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       '204':
 *         description: Book updated
 */
// routes.put('/:id', booksController.updateBook); // Commented out until next week!

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book (Placeholder)
 *     description: This route will eventually delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       '200':
 *         description: Book deleted
 */
// routes.delete('/:id', booksController.deleteBook); // Commented out until next week!

module.exports = routes;
