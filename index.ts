import net from "net"

const server = net.createServer()


server.on("message", (msg) => {
    const data = msg.toString()
})


server.listen(8080, () => {
    console.log("server is running at port 8080")
})