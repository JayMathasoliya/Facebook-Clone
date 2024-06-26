
const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});

let users = [];

const addUser = (userId,socketId)=>{
    !users.some(user=>user.userId === userId) &&
    users.push({userId,socketId});
}

const removeUser = (socketId)=>{
    users = users.filter(user=>user.socketId !== socketId);
}

const getUser = (receiverId)=>{
    return users.find(user=>user.userId === receiverId);
}

io.on("connection", (socket)=>{
    // When Connect
    console.log("a user connected")
    // Take userId and socketId from user
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })

    // Send and Get Message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage",{
            senderId,text,
        })
    })

    // When Disconnect
    socket.on("disconnect", ()=>{
        console.log("a user disconnected");
        removeUser(socket.id);
    })
})