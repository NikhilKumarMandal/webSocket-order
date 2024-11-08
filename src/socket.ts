import { createServer } from "node:http";
import { Server } from "socket.io";


const wsServer = createServer();

const io = new Server(wsServer, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
    socket.on("join", (data) => {
        socket.join(String(data.tenantId));

        socket.emit("join",{roomId: String(data.tenantId)})
    });
})

export default {
    wsServer,
    io
}