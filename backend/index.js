const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

app.get('/',(req, res)=>{
    return res.send("Hello World")
})

app.listen(5000,()=>{
    console.log('Server started!')
})