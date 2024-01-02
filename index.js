const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path= require('path')
const port= process.env.PORT || 3000
app.use(express.static(path.join(__dirname,"public")));
http.listen(port, function(){
    console.log('listening on port')
})

app.get('/', function(req, res){
res.sendFile(__dirname+"/index.html")
})
const io= require("socket.io")(http)

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})