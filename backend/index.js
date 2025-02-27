const Signup = require('./routes/signup')
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
app.get('/',(req, res)=>{
    return res.send("Hello World")
})
app.use('/signup', Signup)

app.listen(5000,()=>{
    console.log('Server started!')
})