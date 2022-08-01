const express = require("express");

// usersRoute is an instance of the express router used to define routes
// The router will be added as a middleware and will take control of requests starting with path /users
const usersRoutes = express.Router();

// Connect to the db
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// Log in a user
usersRoutes.route("/users/signin").post(function (req, response) {
  let db_connect = dbo.getDb();
  let query = {
    email: req.body.email,
    password: req.body.password
  };
  db_connect
    .collection("users")
    .findOne(query, function (err, user) {
      if (err) {
        throw (err);
      }
      response.json(user);
    });
});

// Create new user
usersRoutes.route("/users/signup").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    bookmarks: req.body.bookmarks
  };
  db_connect
    .collection("users")
    .insertOne(newUser, function (err, user) {
      if (err) {
        throw (err);
      }
      response.json(user);
    });
});

// Update single user by id
usersRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete user by id
usersRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = usersRoutes;