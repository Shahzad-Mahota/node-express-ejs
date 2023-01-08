
// REQUIRE
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// JWT-SECRET (CONSTANT)
const secretKey = "secretKey";

// Home URL
app.get("/", (req,res)=>{
    res.send("pakistan zindabad!")
})

// LOGIN-API
app.post("/login", (req,res) => {
    // console.log("login api hit");

    // const reqHeaders = req.headers; // GET REQUEST HEADERS
    // const reqBody = req.body; // GET REQUEST BODY -- (PAYLOAD)

    const user = {
        id:1,
        username:"shahzad mahota",
        email:"dev.shahzadmahota@gmail.com"
    }

    jwt.sign(
        {user}, // payload
        secretKey, // secret Or private key
        {expiresIn:'300s'}, // expiration time in seconds
        (err,token) =>{ // callback function (error, jwt)

            if(err){
                res.json({
                    status:100,
                    message:"something went wrong",
                    exception:err
                });

                // res.send({err});

            }else{
                res.json({
                    status:200,
                    message:"You are successfully logged in",
                    token:token
                });

                // res.send({token});
            }
        }
    )

    // res.send("login api hit");
})

// PROFILE-API
app.get("/user/profile", verifyToken,  (req,res) => {
    console.log("profile api hit");

    const user = {
        id:1,
        name:"shahzad mahota",
        email:"dev.shahzadmahota@gmail.com",
        mobile_no:"+923035190106",
        gender:"male",
        age:28,
    }

    // res.send(user);
    res.json({
        status:200,
        user:user
    });
})


// VERIFY JWT -- (MIDDLEWARE)
function verifyToken(req,res,next){
    console.log("verify jwt token called");

    const reqHeaders = req.headers; // GET REQUEST HEADERS
    const jwTokenWithBearer = reqHeaders.authorization;

    // CHECK IF REQUEST DO NOT HAS JWT-TOKEN
    if (!jwTokenWithBearer) {
        res.json({
            status:100,
            message:"Authroization token not found"
        });
    }
    else{
        const jwToken = jwTokenWithBearer.split(" ");

        // VERIFY JWT-TOKEN
        jwt.verify(jwToken[1], secretKey, (err) => {
            if(err){
                res.json({
                    status:100,
                    message:"Authroization token is invalid or expired",
                    exception:err,
                });
            }else{
                next();
            }
        })
    }
}

// RUN SERVER
const port = 3000;
app.listen(port, ()=>{
    console.log(`project run on port ${port}`);
});
