const http = require("http");

const server = http.createServer();
const PORT = process.env.PORT || 3000

const io = require("socket.io")(server,{
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("se ha conectado un cliente")

    // socket.broadcast.emit("chat_message", {
    //     usuario: "INFO",
    //     mensaje: "Se ha conectado un nuevo usuario"
    // })

    socket.on('typing', () => {
        socket.broadcast.emit('typing', { usuario: socket.id });
      });
    
    socket.on('stop_typing', () => {
        socket.broadcast.emit('stop_typing', { usuario: socket.id });
      });

    socket.on("chat_message", (data) => {
        console.log(data);
        io.emit("chat_message", data);
    })
});

server.listen(PORT, () => {
  console.log("Tu server está listo en el port " + PORT)
});