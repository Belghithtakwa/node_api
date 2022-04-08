
const db = require("../models");
const User = db.user;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


// admin can delete user by id
exports.deleteUserById = (req, res) => {
  // get the user id from the request
  const userId = req.params.id;
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
      // delete the user
      User.destroy({
        where: {
          id: userId
        }
      }).then(user => {
        res.status(200).json({
          message: "User deleted"
        });
      });
    }
  });
}

// moderator can view all users
exports.getAllUsers = (req, res) => {
  // find all users
  User.findAll().then(users => {
    // if there are no users
    if (users.length === 0) {
      res.status(200).json({
        message: "No users found"
      });
    } else {
      // if there are users
      // send the users
      res.status(200).json({
        message: "Users found",
        users: users
      });
    }
  });
}