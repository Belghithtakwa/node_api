module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      authors: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      publishedDate: {
        type: Sequelize.STRING
      },
      description: {
        // text type
        type: Sequelize.TEXT
      },
      pageCount: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.STRING
      },
      averageRating: {
        type: Sequelize.STRING
      },
      ratingsCount: {
        type: Sequelize.STRING
      }
    });
    return Book;
  }