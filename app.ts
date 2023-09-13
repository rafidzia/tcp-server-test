import { heapStats } from "bun:jsc";
import { randomUUID } from "crypto";

let socket_list = new Map<string, Worker>()

// const workerURL = new URL("worker.ts", import.meta.url).href;

// let test: undefined = undefined

let logfile = Bun.file("log.csv")
let logwritter = logfile.writer()

let errorfile = Bun.file("error.log")
let errorwritter = errorfile.writer()

setInterval(()=>{
    let stat = heapStats()
    logwritter.write(`${stat.heapSize},${stat.heapCapacity},${Date.now()}\n`)
    logwritter.flush()
    // Bun.gc(true)
}, 5000)

Bun.listen({
    hostname: "127.0.0.1",
    port: 8080,
    socket: {
        open(socket) {
            // @ts-ignore
            socket.id = randomUUID()
            // @ts-ignore
            // socket_list.set(socket.id, new Worker(workerURL))
        },
        data(socket, data) {
            // @ts-ignore
            // socket_list.get(socket.id)?.postMessage(data)
            let datastr = Buffer.from(data).toString()
        },
        drain(socket) {
            // console.log("drain")
        },
        close(socket) {
            // console.log("close")
            // @ts-ignore
            // socket_list.get(socket.id)?.terminate()
            // @ts-ignore
            // socket_list.delete(socket.id)
        },
        error(socket, error) {
            errorwritter.write(`${error}\n`)
        },
    }
});


