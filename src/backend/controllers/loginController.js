const dbconn = require("../databases/sqlite");
const User = dbconn.User;
const Lists = dbconn.Lists;

let signin = (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.redirect("/signin");
    }
    else {
        User.findOne({
            where: {
                email: email,
                password: password
            }
        }).then(user => {
            if (user != null) {
                console.log("The user info obtained is ", user);
                req.session.user = { name: user.dataValues.name, email, password, id: user.dataValues.id };
                console.log("The session obtained values in user are: ", req.session.user);
                res.redirect("/");
            }
            else {
                req.session.message = "Invalid credentials";
                res.redirect("/signin");
            }

        });
    }
}

let signup = (req, res) => {
    console.log("Entered post request for signup in loginController")
    const { name, email, password } = req.body;
    console.log("Received values for signup are: ", name, email, password);
    if (!(name && email && password)) {
        res.render("signup");
    }
    else {
        User.create({
            name: name,
            email: email,
            password: password
        }).then((user) => {
            console.log("registered the user successfully");
            req.session.user = { name, email, password, id: user.dataValues.id };
            res.redirect("/");
        }).catch(error => {
            console.log("user could not be registered and the error was", error);
            res.render("signup");
        });
    }
}

let newtodo = (req, res) => {
    console.log("req.body input is ", req.body);
    var { item } = req.body;
    console.log("New to do item to be added is ", item);
    var edit = false;
    console.log("New edit boolean to be added is ", edit);
    var done = "no";
    console.log("New done to be added is ", done);
    var user_id = req.session.user.id;
    console.log("New uid to be added is ", user_id);
    if (item != null && user_id) {
        Lists.create({
            item: item,
            edit: edit,
            done: done,
            user_id: user_id
        }).then(todo => {
            console.log("Added new todo to the list,with item value: ", todo.dataValues.item);
            return res.redirect("/");
        }).catch(error => {
            console.log("Could not create the required todo due to error: ", error);
        });
    }
    else {
        console.log("to do item received was null");
        return res.redirect("/");
    }
}

module.exports = {
    signin, signup, newtodo
};