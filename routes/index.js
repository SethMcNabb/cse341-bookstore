const routes = require("express").Router();
const baseController = require("../controllers");

// Route for the homepage
routes.get("/", baseController.getHome);

// Hook up the books routes!
const booksRoutes = require("./books");
routes.use("/books", booksRoutes);

module.exports = routes;
