const express = require("express");
const { Lists } = require("../databases/sqlite");
const app = express();


var profile = (req,res) => {
   var us = req.session.user;
   var uid = req.session.user.id;
   Lists.findAll({
       where:{
           user_id: uid
       }
   }).then(array => {
      if(array.length != 0)
      {
          var n_rows = Math.ceil(array.length/3);
        console.log("Details of to do found are ",array);
        res.render("profile",{
            user: us,
            array: array,
            message: null,
            n_rows: n_rows
        });
      }
      else{
          console.log("No to do found");
          res.render("profile",{
              user: us,
              message: "No to do have been defined yet",
              array: null
          }
          );
      }
   }).catch(error => {
       console.log("Eroor finding to do data", error);
   });
    
};

var signin = (req,res) => {
    if(req.session.message && req.session.message != null){
        var message = req.session.message;
    }
    else{
        var message = null;
    }
    delete req.session.message;
    res.render("sign-in",{
        message: message
    });
   
};

var signup = (req,res) => {
    res.render("signup");
};

var logout = (req,res) => {
    req.session.destroy(()=> {
        console.log("Logged out");
    });
    res.redirect("/signin");
}

var done = (req,res) => {
    console.log("req.body received object is ",req.body);
    var { id } = req.body;
    console.log("todo id obtained for done mark is ",id);
    Lists.findOne({
        where:{
            id:id
        }
    }).then(list => {
        console.log("Obtained to do in list has values ",list);
        var prevdonevalue = list.dataValues.done;
        console.log("prevdonevalue is ",prevdonevalue);
        if(prevdonevalue == "yes")
    {
        prevdonevalue = "no";
        console.log("changed prevdonevalue to no",prevdonevalue);
    }
    else
    {
        prevdonevalue = "yes";
        console.log("changed prevdonevalue to yes",prevdonevalue);
    }
    Lists.update({
        done: prevdonevalue
    },{
    where:{
        id: id
    }}
    ).then(todo =>{
        console.log("Value of to do done now is ",todo.dataValues.done);
       return res.redirect("/");
    }).catch(error => {
        console.log("Could not update value because: ",error);
        return res.redirect("/");
    });
    });
    
}


var deletetodo = (req,res) => {
    console.log("req.body received object is ",req.body);
    var { id } = req.body;
    console.log("todo id obtained for delete is ",id);
    Lists.destroy({
    where:{
        id: id
    }}
    ).then(todo =>{
        console.log("Value deleted is",todo);
       return res.redirect("/");
    }).catch(error => {
        console.log("Could not delete todo because: ",error);
        return res.redirect("/");
    });
}

var createeditinput = (req,res) => {
    console.log("req.body received object is ",req.body);
    var { id } = req.body;
   
    console.log("todo id obtained for editcreate is ",id);
    Lists.update({
        edit: true
        },{
    where:{
        id: id
    }}
    ).then(todo =>{
       return res.redirect("/");
    }).catch(error => {
        console.log("Could not create edit inputs because: ",error);
        return res.redirect("/");
    });
}

var editforreal = (req,res) => {
var{ id,edit } =req.body;
console.log("acquired id and edit values are:",id,edit);
if(edit != "")
{
    Lists.update({
        item: edit,
        edit: false
    },{
        where:{
            id: id
        }
    }).then(() =>{
        console.log("successfully edited the todo");
        return res.redirect("/");
    }).catch(error => {
        console.log("Error updating the values provided",error);
    });
}

else{
    console.log("provided value for edit was null");
    Lists.update({
        edit: false
    },{
        where:{
            id: id
        }
    }
    ).then(()=>{
        console.log("successfully updated just the edit since edit provided was null");
        return res.redirect("/");
    }).catch(error => {
        console.log("Issue updating just the value of edit as well",error);
    });
   
}

}


module.exports = {
    profile: profile,
    signin: signin,
    signup: signup,
    logout: logout,
    done: done,
    deletetodo: deletetodo,
    createeditinput:createeditinput,
    editforreal: editforreal
};