const User = require("./models/User");



app.post("/api/user/new", (req, res) => {
    console.log(req.body);
    var user = new User({
      username: req.body.username,
      email:req.body.email,
      password: req.body.password
    });
    user.save(err => {
      if(err){
        return res.json({success: false, message: "Username taken"});
      }
      return res.json({success: true, message: "Successfully created new user"});
    })
  });

  app.post("/api/user/login", (req, res) => {
      console.log(req.body)
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if(!user){
        res.status(401).send({success: false, message: "wrong username"});
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!err && isMatch){
              const token = jwt.sign({
                _id: user._id,
                username: user.username
              }, process.env.JWT_SECRET);
  
              res.json({success: true, token: "JWT " + token});
            } else {
              res.status(401).send({success: false, message: "wrong username or password"});
            }
        });
      }
    });
  })