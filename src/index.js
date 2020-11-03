const express = require("express")
const path = require("path")
const app = express()


const port = process.env.PORT || 3000
const publicdire = path.join(__dirname,'../public')


app.use(express.static(publicdire))

app.listen(port,()=>{
    console.log("server is up")
})