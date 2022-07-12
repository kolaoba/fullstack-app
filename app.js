const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// require database connection
const dbConnect = require("./db/dbConnect")
// require userModel
const User = require("./db/userModel")
// require bcrypt
const bcrypt = require("bcrypt");
// require JWT
const jwt = require("jsonwebtoken");
// require authentication
const auth = require("./auth");

// execute database connection
dbConnect();

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

// curb CORS Errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});


// creating a register endpoint
app.post("/register", (request, response) => {
  // hash the password
  const nSaltRounds = 10
  bcrypt.hash(request.body.password, nSaltRounds)
  .then((hashedPassword) => {
    const user = new User({
      email: request.body.email,
      password: hashedPassword,
    });

    // save the new user
    user.save()
    .then((result) => {
      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    // catch error if new user was not added to database successfully
    .catch((error) => {
      respones.status(500).send({
        message: "Error creating user",
        error,
      });
    });
  })
  // catch error if password is not successfully hashed
  .catch((e) => {
    response.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  });
});

// creating login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
  // if email exists
  .then((user) => {
    bcrypt.compare(request.body.password, user.password)
    // if passwords match
  .then((passwordCheck) => {

     // check if password matches
     if(!passwordCheck) {
      return response.status(400).send({
        message: "Passwords do not match",
        error,
      });
     }

     // create JWT token
     const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
     );

     // return success response
     response.status(200).send({
      message: "Login Successful",
      email: user.email,
      token,
     });
  })
  // catch error if paswords do not match
  .catch((error) => {
    response.status(400).send({
      message: "Passwords do not match",
      error,
    });
  });
  })
  //catch error if email does not exist
  .catch((e) => {
    response.status(404).send({
      message: "Email not found",
      e,
    });
  });
});


// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me"});
});

module.exports = app;
