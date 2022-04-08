const { default: axios } = require("axios");

// import book model
const db = require("../models");

const Book = db.book;
const User = db.user;


exports.getBooksFromGoogleByKeyWord = (req, res) => {

  const searchKeyword = req.body.searchKeywords;
  if (!searchKeyword) {
    res.status(200).send({
      message: "No search keyword found",
      books: []
    });
  }

  const searchKeywordWithPlus = searchKeyword.replace(/\s/g, "+");
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchKeywordWithPlus).then(response => {
    let numberOfBooks = response.data.totalItems;
    if (numberOfBooks === 0) {
      res.status(200).json({
        message: "No books found"
      });
    } else {
      const books = response.data.items.map(book => {
        const bookData = {
          id: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : book.volumeInfo.authors,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
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
