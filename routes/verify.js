const User = require("../models/User");
//const jwt = require("jsonwebtoken");



module.exports =  {
    loggedin: function(app, req){
        console.log("checking token, here is the raw token");
        console.log(req.session.token);
        token=req.session.token;
        jwt.verify(token,  function(err, decoded) {
            if(err){
                console.log(err);
            }else{
            console.log(decoded); // bar
            }
        });
        // if(vault.read(req)){
        //     return true;
        // }
    }
}