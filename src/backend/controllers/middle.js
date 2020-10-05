const dbconn = require("../databases/sqlite");
const User = dbconn.User;
var sessioncheck = (req,res,next) => {
    if(req.session.user)
    {
        res.redirect("/");
    }
    else
    {
        next();
    }
}
var notloggedin = (req,res,next) => {
    if(!req.session.user)
    {
        console.log("Not logged in");
        res.redirect("/signin");
    }
    else{
        next();
    }
}

var alreadyregistered = (req,res,next) =>{

    var {name, email,password} = req.body;
    User.findOne({
        where:{
            email: email
        }
    }).then(user =>{
        if(user != null)
        {
            console.log("user is already registered");
            req.session.message = "User already registered, Sign in above";
            res.redirect("/signin");  
        }
        else
        {
            next();
        }
    }).catch(error => {
        console.log("error looking for a user in database",error);
    })

}

module.exports = {
    sessioncheck: sessioncheck,
    notloggedin: notloggedin,
    alreadyregistered: alreadyregistered
}