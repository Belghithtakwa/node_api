const express = require("express");
const cors = require("cors");
const semver = require('semver');


// use semver to check if versions of the dependencies are compatible with the current version of the application
if (semver.satisfies(process.version, '>=10.0.0')) {
  console.log('Node version is compatible with this application.');
} else {
  console.log('Node version is not compatible with this application.');
}

// use semver to check the package version of the dependencies
if (semver.satisfies(require('sequelize/package.json').version, '>=5.0.0')) {
  console.log('Sequelize version is compatible with this application.');
} else {
  console.log('Sequelize version is not compatible with this application.');
  throw new Error('Sequelize version is not compatible with this application.');
}



const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Books application" });
});



// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});