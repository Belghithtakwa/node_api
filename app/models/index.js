const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.options.host,
    dialect: config.db.options.dialect,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.book = require("../models/book.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// add wishlist of book to user belongs to many books
db.user.belongsToMany(db.book, {
  through: "user_books",
  foreignKey: "userId",
  otherKey: "bookId"
});
db.book.belongsToMany(db.user, {
  through: "user_books",
  foreignKey: "bookId",
  otherKey: "userId"
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
