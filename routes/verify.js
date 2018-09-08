const User = require("../models/User");
const jwt = require("jsonwebtoken");



module.exports =  {
    loggedin: async function(app, req){
        // console.log("checking token, here is the raw token");
        // console.log(req.session.token);
        var tokenVerify=req.session.token;
        var checkToken;
        var finalReturn=false;
        //console.log(process.env.JWT_SECRET);
        //let whatthe = new Promise 
        jwt.verify(tokenVerify, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                //console.log(err);
                return false;
            }else{
                checkToken=decoded;
                // console.log("token was dycrypted, here it is");
                // console.log(checkToken);
                if(checkToken.username===req.session.username && checkToken._id===req.session.uid)
                {
                    //console.log('checktoken and session user info are equal')
                User.findOne({ 
                    $and:[
                        {username: req.session.username},
                        {_id: req.session.uid}
                    ]
                  }, (err, user) => {
                //console.log(decoded); // bar
                    //console.log("database has replied with a user:");
                    //console.log(user);
                    if (err){
                        //console.log("there was an error in verifying user")
                        console.log(err);
                        return false;
                    }else{
                        // console.log("there was no error in verifying user");
                        let preidstuff=JSON.stringify( user._id);
                        let idstuff=preidstuff.slice(1,preidstuff.length-1)
                        // console.log(idstuff);
                        // console.log(`user.username: ${user.username}, req.session.username: ${req.session.username}, user._id: ${idstuff}, checkToken._id: ${checkToken._id}`)
                        // console.log(typeof(idstuff));
                        // console.log(typeof(checkToken._id));
                        if(user.username===req.session.username && idstuff===checkToken._id){
                            console.log("user was verified correctly")
                            finalReturn=true;
                            return true;
                        }else{
                            return false;
                        }
                    }
                })
                }else{
                    console.log("something has broken cookies or JWT.")
                    return false
                }
            }
        });
            //let newresult= 
            console.log(`finalreturn: ${finalReturn}`)
            return finalReturn;
    
        // if(vault.read(req)){
        //     return true;
        // }
    }
}