const express = require("express")
const path = require("path")
const http = require('http')
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicdire = path.join(__dirname,'../public')


app.use(express.static(publicdire))

io.on('connection',()=>{
    console.log('new websocket')
})

server.listen(port,()=>{
    console.log("server is up")
})