import { randomUUID } from "crypto"
import { createServer } from "net"

const freeMemory = (val: any) => {
    // @ts-ignore
    val = null
}

const server = createServer(socket => {
    socket.on("connect", ()=>{
        // @ts-ignore
        socket.id = randomUUID()
    })
    socket.on("data", (msg) => {
        var data = msg.toString()
        data = data.replace(/\n/g, "")
        freeMemory(data)
        freeMemory(msg)
    })

    socket.on("close", ()=>{
        freeMemory(socket)
    })
})

server.listen(8080, () => {
    console.log("server is running at port 8080")
})