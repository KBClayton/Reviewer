//basic server stuff
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const session = require("express-session");
const socket = require("socket.io");

//db stuff
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reviewdb");



//Amazon stuff
// const AWS=require("aws-sdk");
const fileupload = require("express-fileupload");
// const BUCKET_NAME = 'atxreviewer';
// const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
// const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

//email
const nodemailer = require('nodemailer');

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
  secretOrKey: process.env.JWT_SECRET || "this should not be live"
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
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'all' }))
app.use(helmet.frameguard({action: 'allow-from', domain: 'https://maps.googleapis.com'  }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());
//app.use(cookieParser(secretKey));
//app.use(cookieEncrypter(secretKey));

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("AllowedOrigin", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, Authorization, Accept-Encoding");
  next();
});


//Amazon more stuff
// function uploadToS3(file){
//   let s3bucket = new AWS.S3({
//     accessKeyId: IAM_USER_KEY,
//     secretAccessKey: IAM_USER_SECRET,
//     Bucket: BUCKET_NAME
//   });
//   s3bucket.createBucket(function(){
//     var params = {
//       Bucket: BUCKET_NAME,
//       Key: file.name,
//       Body: file.data
//     };
//     s3bucket.upload(params, function(err, data){
//       if(err){
//         console.log('error in callback');
//         console.log(err);
//       }
//       console.log('success');
//       console.log(data);
//     })
//   })
// }

//api routes
//require("./routes/user")(app, vault, cookieParams);
require("./routes/user")(app);
require("./routes/product")(app);
require("./routes/review")(app);
require("./routes/reply")(app);
require("./routes/recommend")(app);
require("./routes/chat")(app);
require("./routes/reviewRating")(app);
require("./routes/productRating")(app);
// app.post("/upload", function(req, res){
//   uploadToS3(req.files.file);
//   res.send("!")
// });
// app.get("/api/thing", (req, res) => {
//   res.sendfile({success:true, message:"this is hitting the server"})
// })
//require("./routes/admin")(app);

app.get("/api/test", passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({accessible: true});
});
let urlHelper = "http://localhost:3001"

if (process.env.NODE_ENV === "production") {
  urlHelper = "https://austin-reviews.herokuapp.com"
  app.use(express.static("client/build"));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}






//start the party
server = app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//Open websocket to listen for realtime chatting
io = socket(server);


const User = require("./models/User");
io.on('connection', (socket) => { 
    console.log('Socket connected');
    socket.on('SEND_MESSAGE',  (data) => { 
        console.log('Received data');
        data.author=socket.client.user;
        console.log(data)
        io.emit('RECEIVE_MESSAGE', data);
    })
    socket.on('disconnect', () => console.log('Client disconnected'));
});

require('socketio-auth')(io, {
  authenticate:  (socket, data, callback) => {
    //get credentials sent by the client
    console.log("In socket.io auth function, data follows")
    console.log(data)
    //console.log(data.session)
    var token = data.token;
     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err){
          console.log(err);
          return false;
      }else{
          console.log(decoded)
          checkToken=decoded;

          console.log("authentication successfull, username is"+checkToken.username)
          //this.postAuthenticate
           User.findOne({username:checkToken.username}, 'username').then((dbreply, err)=>{
            if(err){
              console.log(err)
            }else{
              console.log(dbreply)
              if(dbreply.username===checkToken.username){
                socket.client.user=dbreply.username;
                return callback(null, true);
              }
            }
          })
          // if(checkToken.username===req.session.username && checkToken._id===req.session.uid)
          // {
          //         let preidstuff=JSON.stringify( user._id);
          //         let idstuff=preidstuff.slice(1,preidstuff.length-1)
          //         if(user.username===req.session.username && idstuff===checkToken._id){
          //             console.log(`${req.session.username} was verified correctly`)

          //         }else{
          //             return false;
          //         }
              
          // }else{
          //     console.log("something has broken cookies or JWT.")
          //     return false
          // }
      }
  })
  },

  postAuthenticate: (socket, data) => {
    // var username = data.username;
    
    // db.findUser('User', {username:username}, function(err, user) {
    //   socket.client.user = user;
    // });
    console.log("in postauthenticate")
    socket.emit({author:'Austin Oddball server',message:`Welcome to the weird chat ${socket.client.username}`})
  },

  disconnect: (socket)=> {
    console.log(socket.client.username + ' disconnected');
  }



});

io.on('unauthorized', function(err){
  console.log("There was an error with the authentication:", err.message);
});

// io.on('message', function () {
  
//  });




