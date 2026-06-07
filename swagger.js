const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Bookstore API",
    version: "1.0.0",
    description: "A simple RESTful API for managing books",
  },
  servers: [
    {
      url: "https://cse341-bookstore.onrender.com/",
      description: "Live Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/books": {
      get: {
        summary: "Get all books",
        tags: ["Books"],
        responses: {
          200: {
            description: "Success",
          },
        },
      },
      post: {
        summary: "Create a new book",
        tags: ["Books"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
        },
      },
    },
    "/books/{id}": {
      get: {
        summary: "Get book by ID",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
        },
      },
      put: {
        summary: "Update an existing book",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          204: {
            description: "Updated",
          },
        },
      },
      delete: {
        summary: "Delete a book",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Deleted",
          },
        },
      },
    },
  },
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
};

module.exports = swaggerSpec;
