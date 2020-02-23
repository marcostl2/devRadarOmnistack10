const express = require('express')
const mongoose=require('mongoose')
const routes=require('./routes')
const cors=require('cors')
const http=require('http')
const {setupWebsocket}=require('./websocket')

mongoose.connect('mongodb+srv://marcostl2:00625400@omnistack10-1c5pa.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app=express()
const server=http.Server(app)

setupWebsocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333)