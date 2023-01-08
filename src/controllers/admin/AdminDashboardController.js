// const helper = require("../../helpers/helper");
// var rp = require("request-promise");
// const systemConfig = require("../config/system");
// var jwt = require("jsonwebtoken");
// var request = require("request");

/*
|========================================================
| Get admin dashboard statistics details
|========================================================
*/
const index = (req, res) => {

  const statistics = {
    categories: 15,
    products: 250,
    orders: 1000,
    users: 125,
  }

  // res.send(statistics);
  res.json({
    status: 200,
    statistics: statistics
  });

}



module.exports = {
  index,
};
