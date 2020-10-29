const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//Instantsiation of express.js
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

//Database conncetion
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123456',
      database : 'smart-brain'
    }
  });

//signin api
app.post("/signin", signin.handleSignin(db, bcrypt));

//register api
app.post("/register", register.handleRegister(db, bcrypt));

//profile/:id api
app.get("/profile/:id", profile.handleProfileGet(db));

//image api
app.put("/image", image.handleImage(db));

//imageAPICall
app.post("/imageUrl", (req, res) => {
    image.handleApiCall(req, res)
});

//Port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
