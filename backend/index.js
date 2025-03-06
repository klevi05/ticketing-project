//routes for the project
const Signup = require('./routes/signup')
const Signin = require('./routes/signin')
const verify = require('./routes/verify')
//libraries needed for the project
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.URL,{
    dbName: "Ticketing"
})
//fixes a cors problem
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
//Route to signup
app.use('/signup', Signup);
//Route to signin
app.use('/signin', Signin);
//Route to verify the jwt
app.use('/verify', verify)
//Open the conection for the server
app.listen(5000,()=>{
    console.log('Server started!')
})