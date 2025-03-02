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