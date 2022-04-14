# Projetnodejs-books

# Description :

A book library API, built with Express, Node.js, Sequelize and MySQL.
An application that allows you to view, modify, add or delete books (CRUD).

# API documentation

- An API is available to get the books. The documentation is available on : https://developers.google.com/books/.

# Team

- Melissa Benmeziane : melissa.benmeziane@mail-ecv.fr
- Takwa Belghith : takwa.belghith@mail-ecv.fr

# Software Stack

- Node js
- Express
- Mysql
- JWT: The JsonWebToken for API security
- Axios
- Sequelize

# Dependencies

- nodeJs 12.13.0 et +
- npm ou yarn ou pnpm

## Project Dependencies

- axios
- express
- bcryptjs
- bluebird
- cookie-parser
- cors
- jsonwebtoken
- mysql2
- semver
- sequelize

# Installation

- Step 1
  Clone Project : git clone git@github.com:Belghithtakwa/node_api.git
- Step 2
  Install Packages : npm i
- Step 3
  Start Project : npm start

## Information :

the application contains 3 Actors:

- Admin
- Moderator
- user

we used # MiddleWares :

- Middleware for the verification of the signUp ('username & email )
- Middleware for verification authentication and authorization( user | moderator | admin )

## The project includes the following endpoints

- GET - welcome
- POST - SignUp Admin
- POST - SignUp user only
- POST - SignIn admin with password
- POST - SignIn user with password
- GET - Authentification test & authorisation user | moderator | admin
- GET Book info by ID
- POST - the admin can get books from google and set them on table books
- Admin can delete users
- Delete Book by id | admin restriction
- Get all books :user roles privilages
- POST - Add books to wishlist
- Get - user can view his wish list
- User can delete a book from his wish list
