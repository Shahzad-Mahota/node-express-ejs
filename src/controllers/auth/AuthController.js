// const helper = require("../../helpers/helper");
// var rp = require("request-promise");
// const systemConfig = require("../config/system");
// var jwt = require("jsonwebtoken");
// var request = require("request");

/*
|========================================================
| Login API --
|========================================================
*/
const login = (req, res) => {
  console.log("hello login api");
  res.send("hello login api");

}

/*
|========================================================
| Singup API --
|========================================================
*/
const signup = (req, res) => {
  console.log("hello singup api");
  res.send("hello signup api");
}


module.exports = {
  login,
  signup,
};
