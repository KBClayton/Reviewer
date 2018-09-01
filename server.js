//basic server stuff
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
const session = require("express-session");

//db stuff
const mongoose = require("mongoose");
//const User = require("./models/User");
//const Product = require("./models/Product");
//const Review = require("./models/Review");
//const Reply = require("./models/Reply");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reviewdb");


//Security stuff
//const cookieParser = require('cookie-parser');
//const cookieEncrypter = require('cookie-encrypter');
const uuidv4 = require('uuid/v4');
const helmet = require('helmet')
const secretKey = process.env.secretKey || 'this should not be live';
const passport = require("passport");
const { Strategy:JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MongoStore = require('connect-mongo')(session);

var sess = {
  secret: process.env.cookiesecret || "this should not be live",
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: true,
    maxAge: 36000000,
    rolling: true
  },
  genid: function(req) {
   return uuidv4() // use UUIDs for session IDs
   },
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}



// const cookieParams = {
//   httpOnly: true,
//   signed: true,
//   maxAge: 300000,
// };
// var vault = cookieEncrypter(process.env.cookieSecret, {
//   cipher: 'aes-256-cbc',
//   encoding: 'base64',
//   cookie: 'oauth-secrets',
//   httpOnly: true
// });

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
app.use(helmet());
app.use(session(sess));
app.use(helmet.permittedCrossDomainPolicies())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser(secretKey));
//app.use(cookieEncrypter(secretKey));
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//api routes
//require("./routes/user")(app, vault, cookieParams);
require("./routes/user")(app);
require("./routes/product")(app);
require("./routes/review")(app);
require("./routes/reply")(app);
//require("./routes/admin")(app);

//html routes




app.get("/api/test", passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({accessible: true});
});




//start the party
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
