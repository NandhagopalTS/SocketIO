//1. Import packages
import express from "express";
import http from "http";
import { Server } from "socket.io";

//2. Create Instances & Make Server
const app= express();
const server = http.createServer(app);
const io = new Server(server);

//3. Server Static File
app.use(express.static("public"));

//5. create the Connection

io.on("connection",(socket)=>{
    console.log("User Connected Successfully");

    socket.on("chat message",(msg)=>{
        io.emit("chat message",msg)
    });

    socket.on('diconnected',()=>{
        console.log("User Disconnected")
    });
});

//6. run Server
server.listen(6070,()=>console.log(`listening on:6070`));