const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);
let booksCollection;

async function connectToDatabase() {
  if (!booksCollection) {
    await client.connect();
    const databaseName = process.env.MONGODB_DB_NAME || "bookstore";
    booksCollection = client.db(databaseName).collection("books");
  }

  return booksCollection;
}

async function getBooksCollection() {
  if (!booksCollection) {
    await connectToDatabase();
  }

  return booksCollection;
}

module.exports = {
  connectToDatabase,
  getBooksCollection,
};
