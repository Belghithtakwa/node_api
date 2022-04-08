const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const cookieParser = require('cookie-parser');


module.exports = function(app) {
  app.use(cookieParser());
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //admin can delete user by id
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUserById
  );

  // moderator can view all users
  app.get(
    "/api/user/all",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getAllUsers
  );
  

  
};
