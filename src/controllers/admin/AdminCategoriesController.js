// const helper = require("../../helpers/helper");
// var rp = require("request-promise");
// const systemConfig = require("../config/system");
// var jwt = require("jsonwebtoken");
// var request = require("request");

/*
|========================================================
| Get listing of all categories from storage
|========================================================
*/
const index = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}



/*
|========================================================
| Get required data for creating new category
|========================================================
*/
const create = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


/*
|========================================================
| Store new category in storage
|========================================================
*/
const store = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


/*
|========================================================
| Get specific category details for editing
|========================================================
*/
const edit = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


/*
|========================================================
| Update specific category details in storage
|========================================================
*/
const update = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


/*
|========================================================
| Delete specific category from storage -- Delete Single
|========================================================
*/
const destroy = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


/*
|============================================================
| Delete multiple categories from storage -- Delete Multiple
|============================================================
*/
const destroyMultiple = (req, res) => {

  const user = {
    id: 1,
    name: "shahzad mahota",
    email: "dev.shahzadmahota@gmail.com",
    mobile_no: "+923035190106",
    gender: "male",
    age: 28,
  }

  // res.send(user);
  res.json({
    status: 200,
    user: user
  });

}


module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
  destroyMultiple
};
