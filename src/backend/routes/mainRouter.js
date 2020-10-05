const mainController = require("../controllers/mainController.js");
const loginController = require("../controllers/loginController");
const middle = require("../controllers/middle.js");

const express = require("express");
const router = express.Router();

router.route("/").get(middle.notloggedin,mainController.profile);

router.route("/add").post(loginController.newtodo);

router.route("/todo_done").post(mainController.done);

router.route("/todo_delete").post(mainController.deletetodo);

router.route("/create_edit").post(mainController.createeditinput);

router.route("/todo_edit").post(mainController.editforreal);

router.route("/signin").get(middle.sessioncheck,mainController.signin);

router.route("/signup").get(middle.sessioncheck,mainController.signup);

router.route("/signin").post(loginController.signin);

router.route("/signup").post(middle.alreadyregistered,loginController.signup);

router.route("/logout").get(mainController.logout);

module.exports =  {
   router: router
};