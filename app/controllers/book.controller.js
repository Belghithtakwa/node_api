const { default: axios } = require("axios");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/auth.config");

// import book model
const db = require("../models");

const Book = db.book;
const User = db.user;


exports.getBooksFromGoogleByKeyWord = (req, res) => {
  // get the search keyword from the request 
  // if the keyword is empty, response with empty of not send respnd with empty array and status code 200 and message
  const searchKeyword = req.body.searchKeywords;
  if (!searchKeyword) {
    res.status(200).send({
      message: "No search keyword found",
      books: []
    });
  }

    const searchKeywordWithPlus = searchKeyword.replace(/\s/g, "+");
      // axios get request to google books api
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchKeywordWithPlus).then(response => {
    let numberOfBooks = response.data.totalItems;
    let books = [];
    // if there are no books found
    if (numberOfBooks === 0) {
      res.status(200).json({
        message: "No books found"
      });
    } else {
        // if there are books found
        // map through the response and set the book data
      const books = response.data.items.map(book => {
        const bookData = {
          id: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
        // if authors is a list, join the authors with a comma or affect as it is 
          authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : book.volumeInfo.authors,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
        // if categories is a list, convert to string or affect as it is
          categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : book.volumeInfo.categories,
          averageRating: book.volumeInfo.averageRating,
          ratingsCount: book.volumeInfo.ratingsCount
        }
        // check if the book is already in the database
        Book.findOne({
          where: {
            id: book.id
          }
        }).then(book => {
          // if the book is already in the database
          if (book) {
            // do nothing
          } else {
            // if the book is not in the database
            // create the book
            Book.create(bookData).then(book => {
              // do nothing
            });
          }
        });

        
        // return the book data
        return book;
      });
      // send the books
      res.status(200).json({
        message: "Books found",
        numberOfBooks: numberOfBooks,
        books: books
      });
    }
  });
}

exports.deleteBookById = (req, res) => {
  // get the book id from the request
  const bookId = req.params.id;
  // find the book by id
  Book.findOne({
    where: {
      id: bookId
    }
  }).then(book => {
    // if the book is not found
    if (!book) {
      res.status(200).json({
        message: "Book not found"
      });
    } else {
      // if the book is found
      // delete the book
      Book.destroy({
        where: {
          id: bookId
        }
      }).then(book => {
        res.status(200).json({
          message: "Book deleted"
        });
      });
    }
  });
}

// get all books
exports.getAllBooks = (req, res) => {
  // find all books
  Book.findAll().then(books => {
    // if there are no books
    if (books.length === 0) {
      res.status(200).json({
        message: "No books found"
      });
    } else {
      // if there are books
      // send the books
      res.status(200).json({
        message: "Books found",
        books: books
      });
    }
  });
}


// add book to wishlist by id and user id
exports.addBookToWishList = (req, res) => {
  const bookId = req.body.bookId;
  const token = req.cookies.token;
  const payload = jsonwebtoken.verify(token, config.secret);
  const userId = payload.id;
  Book.findOne({
    where: {
      id: bookId
    }
  }).then(book => {
    if (!book) {
      res.status(200).json({
        message: "Book not found"
      });
    } else {
      User.findOne({
        where: {
          id: userId
        }
      }).then(user => {
        if (!user) {
          res.status(200).json({
            message: "User not found"
          });
        } else {
          user.addBook(book).then(user => {
            res.status(200).json({
              message: "Book added to wishlist"
            });
          });
        }
      });
    }
  });
}

// users can get their wishlist
exports.getWishList = (req, res) => {
  // get the token from the request cookie
  const token = req.cookies.token;
  // get the payload from the token and get the user id  secret or public key must be provided from the auth.config.js
  const payload = jsonwebtoken.verify(token, config.secret);
  const userId = payload.id;
  // find the user by id
  User.findOne({
    where: {
      id: userId
    }
  }).then(user => {
    // if the user is not found
    if (!user) {
      res.status(200).json({
        message: "User not found"
      });
    } else {
      // if the user is found
      // get the user's wishlist
      user.getBooks().then(books => {
        // if there are no books
        if (books.length === 0) {
          res.status(200).json({
            message: "No books found"
          });
        } else {
          // if there are books
          // send the books
          res.status(200).json({
            message: "Books found",
            books: books
          });
        }
      });
    }
  });
}

// users can remove a book from their wishlist
exports.deleteBookFromWishList = (req, res) => {
  // get the book id and user id from the request
  const bookId = req.params.bookId;

  // get the token from the request cookie
  const token = req.cookies.token;
  // get the payload from the token and get the user id  secret or public key must be provided from the auth.config.js
  const payload = jsonwebtoken.verify(token, config.secret);
  const userId = payload.id;


  // find if the user has the book in their wishlist
  User.findOne({
    where: {
      id: userId
    }
  }).then(user => {
    // if the user is not found
    if (!user) {
      res.status(200).json({
        message: "User not found"
      });
    } else {
      // if the user is found
      // find the book by id
      Book.findOne({
        where: {
          id: bookId
        }
      }).then(book => {
        // if the book is not found
        if (!book) {
          res.status(200).json({
            message: "Book not found"
          });
        } else {
          // if the book is found
          // remove the book from the user's wishlist
          user.removeBook(book).then(user => {
            res.status(200).json({
              message: "Book removed from wishlist"
            });
          });
        }
      });
    }
  });
}

exports.getBookById = (req, res) => {
  // get the book id from the request
  const bookId = req.params.id;
  // find the book by id
  Book.findOne({
    where: {
      id: bookId
    }
  }).then(book => {
    // if the book is not found
    if (!book) {
      res.status(200).json({
        message: "Book not found"
      });
    } else {
      // if the book is found
      // send the book
      res.status(200).json({
        message: "Book found",
        book: book
      });
    }
  });
}