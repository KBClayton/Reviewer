const Chat= require("../models/Chat");

module.exports = function(app) {

    app.get("/api/chat", function(req, res){
      //console.log(req.body);
     // console.log(vault.read(req));
        Chat.find({}).then(dbModel => res.json(dbModel));
    });
  
    app.get("/api/chat/:id", function(req, res){
     // console.log(req.body);
        Chat.findOne({_id:req.params.id}).then(dbModel => res.json(dbModel));
    });
  
    app.post("/api/chat",  function(req, res){
        //console.log(req.body);
       // console.log(req.session.uid);
        Chat.create(req.body).then(dbModel => {
          //update user
          User.findByIdAndUpdate(req.session.uid, { "$push": { "chats": dbModel._id } },
          { "new": true, "upsert": true }).then(dbreply=> {
            //console.log(dbreply);
            res.json(dbModel);
          });
          //res.json(dbModel)
        });
    });
  }