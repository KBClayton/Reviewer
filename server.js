//basic server stuff
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();


//db stuff
const mongoose = require("mongoose");
//const User = require("./models/User");
//const Product = require("./models/Product");
//const Review = require("./models/Review");
//const Reply = require("./models/Reply");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reviewdb");


//Security stuff
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
const helmet = require('helmet')
const secretKey = process.env.secretKey || 'this should not be live';
const passport = require("passport");
const { Strategy:JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var vault = cookieEncrypter(process.env.cookieSecret, {
  cipher: 'aes-256-cbc',
  encoding: 'base64',
  cookie: 'oauth-secrets',
  httpOnly: true
});

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(passportOpts,
(jwt_payload, done) => {
  User.findOne({_id: jwt_payload._id}, (err, user) => {
    if(err) {return done(err, false);}
    if(user){
      done(null, user);
    } else {
      done(null, false);
    }
  })
}));


//app.use statements
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(secretKey));
app.use(cookieEncrypter(secretKey));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//api routes
require("./routes/user")(app, vault);
require("./routes/product")(app, vault);
require("./routes/review")(app, vault);
require("./routes/reply")(app, vault);
//require("./routes/admin")(app);

//html routes




app.get("/api/test", passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({accessible: true});
});




//start the party
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
