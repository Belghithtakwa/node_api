# Projetnodejs-books

# Dependencies

- nodeJs 12.13.0 et +
- npm ou yarn ou pnpm

# API documentation

An API is available to get the books. The documentation is available on : https://developers.google.com/books/.

# Team

- Melissa Benmeziane : melissa.benmeziane@mail-ecv.fr
- Takwa Belghith : takwa.belghith@mail-ecv.fr

# Installation

- Step 1
  Clone Project : git clone git@github.com:Belghithtakwa/node_api.git
- Step 2
  Install Packages : npm i
- Step 3
  Start Project : npm start

## Information :

the application contains 3 Actors:
-Admin
-Moderator
-user

we used :

- Middleware for the verification of the signUp ('username & email )
- Middleware for verification authentication and authorization( user | moderator | admin )

## tech

-JWT: The JsonWebToken for API security
-Axios
-Sequelize
