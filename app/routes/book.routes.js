const { authJwt } = require("../middleware");
const controller = require("../controllers/book.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/books/addbooksbykeywordfromgoogle",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getBooksFromGoogleByKeyWord
  );

// delete book by id and only admin can delete
  app.delete(
    "/api/book/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBookById
  );

  // users can view books available in the database
  app.get(
    "/api/book/all",
    [authJwt.verifyToken],
    controller.getAllBooks
  );
  
   // users can add book to their wishlist
   app.post(
    "/api/book/addtowishlist",
    [authJwt.verifyToken],
    controller.addBookToWishList
  );

  // users can view their wishlist
  app.get(
    "/api/book/wishlist",
    [authJwt.verifyToken],
    controller.getWishList
  );

  // users can delete book from their wishlist
  app.delete(
    "/api/book/deletewishlist/:bookId",
    [authJwt.verifyToken],
    controller.deleteBookFromWishList
  );

  // users can view book by id
  app.get(
    "/api/book/:id",
    [authJwt.verifyToken],
    controller.getBookById
  );
  };