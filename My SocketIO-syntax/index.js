//1. Packages
import express from "express"
import http from "http"
import { fileURLToPath } from "url"
import { dirname,join } from "path"
import { Server } from "socket.io"

//2. Instances
const app = express()
const server= http.createServer(app)
const io =new Server(server)

//3. Serving HTML File

const __dirname= dirname(fileURLToPath(import.meta.url))
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"index.html"))
})

//4. Define a connection event handler

io.on('connection',(socket)=>{
    console.log("User Connected to server");
    // console.log(socket);

    //Emit a 'message' event to the client $$ emit is used to send our text or message to the opposite party.
    socket.emit("message","Welcome to the server!")

    socket.on('disconnect',()=>{
        console.log("User Disconnected from server");
    })
})

//5. Start the Sever
const PORT=3000
server.listen(PORT,(req,res)=>{
    console.log(`Sever at port: ${PORT}`);
})