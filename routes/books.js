const routes = require("express").Router();
const booksController = require("../controllers/books");
const { validateBook } = require("../middleware/validate");

/**
 * @swagger
 * /books:
 * get:
 * summary: Get all books
 * tags: [Books]
 * responses:
 * '200':
 * description: Success
 */
routes.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 * get:
 * summary: Get book by ID
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Success
 */
routes.get("/:id", booksController.getBookById);

/**
 * @swagger
 * /books:
 * post:
 * summary: Create a new book
 * tags: [Books]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * '201':
 * description: Created
 */
routes.post("/", validateBook, booksController.createBook);

/**
 * @swagger
 * /books/{id}:
 * put:
 * summary: Update an existing book
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * '204':
 * description: Updated
 */
routes.put("/:id", validateBook, booksController.updateBook);

/**
 * @swagger
 * /books/{id}:
 * delete:
 * summary: Delete a book
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Deleted
 */
routes.delete("/:id", booksController.deleteBook);

module.exports = routes;