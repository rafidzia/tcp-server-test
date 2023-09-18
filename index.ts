import { randomUUID } from "crypto"
import {createServer} from "net"

const server = createServer(socket => {
    socket.on("connect", ()=>{
        // @ts-ignore
        socket.id = randomUUID()
    })
    socket.on("data", (msg) => {
        var data = msg.toString()
    })

    socket.on("close", ()=>{
        // @ts-ignore
        socket = null
    })
})

server.listen(8080, () => {
    console.log("server is running at port 8080")
})