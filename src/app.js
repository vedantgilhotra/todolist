const express = require("express");
const router = express.Router();
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const mainRouter = require(__dirname + "/backend/routes/mainRouter");
const cookieParser = require("cookie-parser");

app.use(logger("dev"));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("views", __dirname + "/client/views");

app.use(express.static(path.join(__dirname,"/client/images")));

app.engine("html",require("ejs").renderFile);

app.set("view engine","ejs");

app.use(cookieParser());

app.use(session({
    secret: "this_remains_a_secret",
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*2,
        sameSite: true
    }
}));
/*
app.use((req,res,next) => {
    if(req.cookie.user_sid && !req.session.user)
    {
        res.clearCookie('user_sid');
    }
    next();
});
*/

app.use("/",mainRouter.router);

app.set("port", 4000 );

app.listen(app.get("port"), () => {
    console.log("Application runnning in port ",app.get("port"));
});

module.exports = app;