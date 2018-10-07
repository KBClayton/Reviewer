const User = require("../models/User");
const jwt = require("jsonwebtoken");



module.exports =  {
    loggedin: async function(req){
        var tokenVerify=req.session.token;
        var checkToken;
        var finalReturn=false;
        await User.findOne({ 
            $and:[
                {username: req.session.username},
                {_id: req.session.uid}
            ]
          }, (err, user) => {
            if (err){
                console.log(err);
                return false;
            }
            jwt.verify(tokenVerify, process.env.JWT_SECRET, function(err, decoded) {
                if(err){
                    console.log(err);
                    return false;
                }else{
                    checkToken=decoded;
                    if(checkToken.username===req.session.username && checkToken._id===req.session.uid)
                    {
                            let preidstuff=JSON.stringify( user._id);
                            let idstuff=preidstuff.slice(1,preidstuff.length-1)
                            if(user.username===req.session.username && idstuff===checkToken._id){
                                console.log(`${req.session.username} was verified correctly`)
                                finalReturn=true;
                            }else{
                                return false;
                            }
                        
                    }else{
                        console.log("something has broken cookies or JWT.")
                        return false
                    }
                }
            })
        })
        return finalReturn;
    },
    admin: async function(req){
        var tokenVerify=req.session.token;
        var checkToken;
        var finalReturn=false;
        await User.findOne({ 
            $and:[
                {username: req.session.username},
                {_id: req.session.uid}
            ]
          }, (err, user) => {
            if (err){
                console.log(err);
                return false;
            }
            if(!user.roles.includes("administrator")){
                console.log("failed admin verification")
                return false;
            }
            jwt.verify(tokenVerify, process.env.JWT_SECRET, function(err, decoded) {
                if(err){
                    console.log(err);
                    return false;
                }else{
                    checkToken=decoded;
                    if(checkToken.username===req.session.username && checkToken._id===req.session.uid)
                    {
                            let preidstuff=JSON.stringify( user._id);
                            let idstuff=preidstuff.slice(1,preidstuff.length-1)
                            if(user.username===req.session.username && idstuff===checkToken._id){
                                console.log(`${req.session.username} was verified correctly`)
                                finalReturn=true;
                            }else{
                                return false;
                            }
                        
                    }else{
                        console.log("something has broken cookies or JWT.")
                        return false
                    }
                }
            })
        })
        return finalReturn;
    }
}