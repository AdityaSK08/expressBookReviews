const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user (yet to be implemented)
public_users.post("/register", (req, res) => {
  // Placeholder code for user registration
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Return the list of books in the shop as a JSON response
  res.status(200).send(JSON.stringify(books, null, 2)); // Formatting JSON with 2-space indentation
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;  // Retrieve the ISBN from the request parameters

  // Look up the book in the books database by ISBN
  const book = books[isbn];

  if (book) {
    // If the book is found, return it as a JSON response
    res.status(200).send(JSON.stringify(book, null, 2));  // Neatly formatted JSON
  } else {
    // If the book is not found, return a 404 response
    res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author (yet to be implemented)
public_users.get('/author/:author', function (req, res) {
  // Placeholder code for getting book details by author
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title (yet to be implemented)
public_users.get('/title/:title', function (req, res) {
  // Placeholder code for getting book details by title
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book review (yet to be implemented)
public_users.get('/review/:isbn', function (req, res) {
  // Placeholder code for getting book reviews by ISBN
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
