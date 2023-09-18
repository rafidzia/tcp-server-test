import {createServer} from "net"

const server = createServer(socket => {
    socket.on("data", (msg) => {
        const data = msg.toString()
    })
})

server.listen(8080, () => {
    console.log("server is running at port 8080")
})