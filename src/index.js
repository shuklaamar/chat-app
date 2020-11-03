const express = require("express")
const path = require("path")
const http = require('http')
const socketio = require("socket.io")
const filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicdire = path.join(__dirname,'../public')


app.use(express.static(publicdire))

let count=0

io.on('connection',(socket)=>{
    console.log('new websocket')

    socket.emit('message','welcome')
    socket.broadcast.emit('message',"a new user has joined")

    socket.on('sendMessage',(message,callback)=>{
        const Filter = new filter()

        if(Filter.isProfane(message)){
            return callback('profenaty not allowed')
        }

        io.emit('message',message)
        callback()
    })

    socket.on('location',(coords,callback)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords. longittude}`)
        callback()
    })

    socket.on('disconnect',()=>{
        io.emit('message',"A user has left the chat")
    })
    
})

server.listen(port,()=>{
    console.log("server is up")
})