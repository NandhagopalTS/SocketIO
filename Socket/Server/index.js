import express from "express"
import {createServer} from "node:http"
import { Server } from "socket.io"
import cors from "cors"


// Configurations
 const app= express()
 const server=createServer(app)
 const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

//  Middlewares

app.use(cors())

// socket.io

io.on("connection",(socket)=>{
    console.log('New Client Connected');
    
    socket.on("message",(message)=>{
        console.log("Messsage Received:",message);
        io.emit("message",message)
    })

    socket.on("disconnect",()=>{
        console.log("Client Disconnected");
    })
})

// Server PORT
const PORT=5000
server.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
})