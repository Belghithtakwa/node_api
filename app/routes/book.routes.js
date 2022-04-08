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

  };