import { randomUUID } from "crypto"
import { createServer } from "net"

const server = createServer(socket => {
    socket.on("connect", ()=>{
        // @ts-ignore
        socket.id = randomUUID()
    })
    socket.on("data", (msg) => {
        var data = msg.toString()
        data = data.replace(/\n/g, "")
        // @ts-ignore
        // data = null
        // @ts-ignore
        // msg = null
    })

    socket.on("close", ()=>{
        // @ts-ignore
        // socket = null
    })
})

server.listen(8090, () => {
    console.log("server is running at port 8090")
})