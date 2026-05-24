const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "A simple RESTful API for managing books",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          required: ["title", "author", "genre", "publishYear", "pages"],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the book",
              example: "60c72b2f9b1e8a001c8e4b11",
            },
            title: {
              type: "string",
              description: "Title of the book",
              example: "The Hobbit",
            },
            author: {
              type: "string",
              description: "Author of the book",
              example: "J.R.R. Tolkien",
            },
            genre: {
              type: "string",
              description: "Genre of the book",
              example: "Fantasy",
            },
            publishYear: {
              type: "number",
              description: "Year the book was published",
              example: 1937,
            },
            pages: {
              type: "number",
              description: "Number of pages",
              example: 310,
            },
          },
        },
      },
    },
  },
  apis: [require("path").join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
