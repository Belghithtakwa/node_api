const { default: axios } = require("axios");

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
