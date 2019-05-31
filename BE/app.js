const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const port = 3005

const app = express()
const server = app.listen(port, ()=>{
    console.log("server listening on port", port)
})
const io = socketio(server)
const pixelData = [
    ['red','red','blue','black'],
    ['red','red','blue','black'],
    ['red','red','blue','black'],
    ['red','red','blue','black'],
]
//app.use(express.static(path.join(__dirname,'./dist')))
io.on('connection',(ws) => {
    ws.emit('pixel-data',pixelData)
    ws.on('draw-dot',({row,col,color})=>{
        pixelData[row][col] = color
        ws.broadcast.emit('update-dot',{row,col,color})
        ws.emit('update-dot',{row,col,color})
    })//解构赋值
    ws.on("disconnect",()=>{
        console.log('some one leaves')
    })
})
    