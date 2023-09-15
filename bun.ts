import { heapStats } from "bun:jsc";
import { randomUUID } from "crypto";
import {WorkerPool} from "@rushstack/worker-pool";
// import wp from "workerpool"

// var pool = wp.pool("./worker.js")
var pool = new WorkerPool({
    id: "test",
    workerScriptPath: "./worker.ts",
    maxWorkers: 1000,
})

// pool.checkoutWorkerAsync(true).then((worker)=>{
//     worker.postMessage("asd")
//     pool.checkinWorker(worker)
// })

// const workerURL = new URL("worker.ts", import.meta.url).href;

// // let test: undefined = undefined

// let logfile = Bun.file("log.csv")
// let logwritter = logfile.writer()

// let errorfile = Bun.file("error.log")
// let errorwritter = errorfile.writer()

setInterval(()=>{
//     // let stat = heapStats()
//     // logwritter.write(`${stat.heapSize},${stat.heapCapacity},${Date.now()}\n`)
//     // logwritter.flush()
    Bun.gc(false)
}, 5000)

Bun.listen({
    hostname: "127.0.0.1",
    port: 8080,
    socket: {
        open(socket) {
            // @ts-ignore
            socket.id = randomUUID()
            // @ts-ignore

        },
        data(socket, data) {
            // @ts-ignore
            pool.checkoutWorkerAsync(true).then((worker)=>{
                worker.postMessage(data)
                worker.once("message", (result)=>{
                    if(result === "done"){
                        result = undefined
                        // @ts-ignore
                        data = undefined
                        pool.checkinWorker(worker)
                    }
                })
            })

            // pool.exec("test", [data]).then((result)=>{
            //     // console.log(result)
            // }).catch((error)=>{
            //     console.log(error)
            // })
        },
        drain(socket) {
            // console.log("drain")
        },
        close(socket) {
            // console.log("close connection")
            // @ts-ignore
            socket = undefined
        },
        error(socket, error) {
            // errorwritter.write(`${error}\n`)
        },
    }
});


