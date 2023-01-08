var fs = require("fs");
var nodemailer = require("nodemailer");

module.exports = {
  sendError: function (res, text) {
    res.status(405);
    res.send({
      status: "false",
      data: text,
      code: NOT_FOUND_ERROR,
    });
  },
  sendErrorWCode: function (res, text, code) {
    res.status(code);
    res.send({
      status: "error",
      errorMessage: text,
      code: code,
    });
  },
  sendSuccess: function (res, text) {
    res.send({
      status: true,
      data: text,
      code: SUCCESS_CODE,
    });
  },


  checkFieldAuto: function (res, post_data, fields) {
    for (let i = 0; i < fields.length; i++) {
      if (!post_data.hasOwnProperty(fields[i])) {
        console.log(fields[i]);
        this.sendError(
          res,
          fields[i] + " field missing or empty or unprocessable- required"
        );
        return false;
      } else {
        if (fields[i] == "email") {
          if (!this.validateEmail(post_data.email)) {
            this.sendError(res, "Email (email) field incorrect- required");
            return false;
          }
        }
      }
    }
    return true;
  },

  
  generateRandomString: function (size) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text + new Date().getTime();
  },
  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validateField: function (res, post_data, field, name) {
    if (!post_data.hasOwnProperty(field) || post_data[field] == "") {
      this.sendError(
        res,
        name +
          "(" +
          field +
          ") field missing or empty or unprocessable- required"
      );
      return false;
    } else {
      if (field == "email") {
        if (!this.validateEmail(post_data.email)) {
          this.sendError(res, "Email (email) field incorrect- required");
          return false;
        }
      }
      return true;
    }
  },
  validateFieldWOError: function (post_data, field) {
    if (!post_data.hasOwnProperty(field) || post_data[field] == "")
      return false;
    else return true;
  },
  postQueryDefault: function (err, res, msg, errMsg = null) {
    if (err) {
      console.log(err);
      if (errMsg != null) helper.sendErrorWCode(res, err, 500);
      else helper.sendErrorWCode(res, errMsg, 500);
      return;
    } else {
      helper.sendSuccess(res, msg);
      return;
    }
  },
  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  postQueryErrorOnly: function (err, res, errMsg = null) {
    if (err) {
      console.log(err);
      if (errMsg != null) helper.sendErrorWCode(res, errMsg, 500);
      else helper.sendErrorWCode(res, err, 500);
      return true;
    } else {
      return false;
    }
  },
  getMongoId: function (id) {
    try {
      convert = mongoose.Types.ObjectId(id);
      return convert;
    } catch (e) {
      return "";
    }
  },
  generateUserAccessToken: function () {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 60; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text + new Date().getTime();
  },
  generateVerifyToken: function () {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  getUserRegisterEmailTemplate: function (token) {
    var html =
      `<!DOCTYPE html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>Confirm</title>
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
                </head>
                <body>
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="20" cellspacing="0" width="700" id="emailContainer" style="background: #fff;padding: 25px 25px 0 25px">
                                        <tr>
                                            <td align="center" valign="top" style="padding: 40px 0;">
                                            <img src="` +
      base_url +
      `/assets/img/SPA%20LOGO.svg" alt="logo" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" style="color: #000;font-size:33px;font-weight: 500; font-family: 'Lato';padding: 20px 105px 40px;">
                                                Confirm your account!
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" valign="top" style="color: #000;font-size:15px;font-family: 'Lato';line-height: 1.6;padding: 0 62px;">
                                            
                                                You're the newest member of Spabalon and we're looking forward to getting to know each other.
                                                <p>To get started,please click the button to confirm your email  address.</p>
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" style="color: #000;font-size:15px;font-family: 'Lato';padding: 35px 0;">
                                            <a href="` +
      base_url +
      "/web/frontend/site/verify/" +
      token +
      `" style="background: #7cc244;padding:14px 50px;color: #fff;text-decoration: none;border-radius: 5px;font-weight: bold;">CONFIRM ACCOUNT</a>
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td align="left" valign="top" style="color: #000;font-size:15px;font-family: 'Lato';line-height: 1.6;padding: 10px 62px;">
                                                If you did not sign up on Spabalon,then you can just ignore this email.
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" style="color: #838383;font-size:13px;font-family: 'Lato';padding-top: 0;background: #4717f6;border-top-right-radius: 5px;border-top-left-radius: 5px;">
                                                <table border="0" cellpadding="20" cellspacing="0" width="660" id="emailContainer">
                                                    <tr>
                                                        <td align="center" valign="top" style="color: #fff;font-size:13px;font-family: 'Lato';padding-bottom: 5px;">
                                                            <a href="#" style="color: #fff;font-size:13px;font-family: 'Lato';text-decoration: none;padding-bottom: 5px;">Privay Policy</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                            <td align="center" valign="top" style="color: #fff;font-size:13px;font-family: 'Lato';padding-top: 0;padding-bottom: 10px;">
                                                <a href="#" style="color: #fff;font-size:13px;font-family: 'Lato';text-decoration: none;padding-top: 0">Terms & Conditions</a>
                                            </td>
                                        
                                        </tr>
                                            <tr>
                                            <td align="center" valign="top" style="color: #fff;font-size:13px;font-family: 'Lato';padding-top:0;padding-bottom: 10px;">
                                                <a href="#" style="text-decoration: none;">
                                                    <img src="https://image.ibb.co/btituJ/005_facebook_logo_button.png" alt="facebook_256" border="0" width="26" style="padding: 3px;"></a>
                                                <a href="#" style="text-decoration: none;">
                                                    <img src="https://image.ibb.co/b0KSMy/003_twitter_logo_button.png" alt="twitter_1" border="0" width="26" style="padding: 3px;"></a>
                                                    <a href="#" style="text-decoration: none;">
                                                    <img src="https://image.ibb.co/fUEf8d/004_instagram_logo.png" alt="twitter_1" border="0" width="26" style="padding: 3px;"></a>
                                                    <a href="#" style="text-decoration: none;">
                                                    <img src="https://image.ibb.co/b9zrEJ/002_google_plus_logo_button.png" alt="twitter_1" border="0" width="26" style="padding: 3px;"></a>

                                            </td>
                                        </tr>
                                            <tr>
                                            <td align="center" valign="top" style="color: #fff;font-size:13px;font-family: 'Lato';padding-top: 0;padding-bottom: 10px;">
                                                <a href="#" style="color: #fff;font-size:13px;font-family: 'Lato';text-decoration: none;">Copyright Spabalon.LLC 2018</a>  

                                            </td>
                                        </tr>
                                    
                                    </table>
                                                
                                            </td>
                                        
                                        </tr>
                                        
                                    </table>
                                    
                                        
                                        
                                
                                </td>
                            </tr>
                        </table>
                </body>
                </html>`;

    return html;
  },
  validateFieldAuto: function (res, post_data, fields) {
    for (let i = 0; i < fields.length; i++) {
      if (
        !post_data.hasOwnProperty(fields[i]) ||
        post_data[fields[i]] == "" ||
        post_data[fields[i] == null]
      ) {
        this.sendError(
          res,
          fields[i] + " field missing or empty or unprocessable- required"
        );
        return false;
      } else {
        if (fields[i] == "email") {
          if (!this.validateEmail(post_data.email)) {
            this.sendError(res, "Email (email) field incorrect- required");
            return false;
          }
        }
      }
    }
    return true;
  },
  sendMail: function (email, subject, token) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "reset.thrivefxsignals@gmail.com",
        pass: "Jakelong77",
      },
    });

    var mailOptions = {
      from: "Thrivefx",
      to: email,
      subject: subject,
      html: "<p> Your verification code is :" + token + "</p>",
    };

    if (mailOptions != null) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  },
  sendContactMail: function (name, email, message) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "automated.madloops@gmail.com",
        pass: "Madloops101!",
      },
    });

    var mailOptions = {
      from: "thrivefxsignals@gmail.com",
      to: "thrivefxsignals@gmail.com",
      subject: "New support message from " + name + "(" + email + ")",
      html: "<p> " + message + "</p>",
    };

    if (mailOptions != null) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  },

  getPreviousDate : function (days) {
    var today = new Date();
  
    //Change it so that it is 7 days in the past.
    var dateFrom = today.getDate() - days;
    today.setDate(dateFrom);
  
    return this.formatDate(new Date(today));
  },
  formatDate :function (date)  {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? "0" + month : month;
    const day = date.getDate();
    const formattedDay = day < 10 ? "0" + day : day;
    return year + "-" + formattedMonth + "-" + formattedDay;
  }
};
