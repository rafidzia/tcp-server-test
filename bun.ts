// import { heapStats } from "bun:jsc";
import { randomUUID } from "crypto";
// import {WorkerPool} from "@rushstack/worker-pool";
// import { Subprocess } from "bun";

import {fork, ChildProcess} from "node:child_process"

// var pool = new WorkerPool({
//     id: "test",
//     workerScriptPath: "./worker.ts",
//     maxWorkers: 1000,
// })

//     return Bun.spawn([process.argv[0], "process.ts"], {

//         onExit(proc, exitCode, signalCode, error) {
//             subProcess = startSubProcess()
//         },
//         stdin: "pipe",
//     })

let subProcess: ChildProcess

let startSubProcess = ()=>{

    const cp = fork("./process.ts")
    cp.on("exit", (code, signal)=>{
        subProcess = startSubProcess()
    })
    return cp
}

subProcess = startSubProcess()

Bun.listen({
    hostname: "127.0.0.1",
    port: 8080,
    socket: {
        open(socket) {
            // @ts-ignore
            socket.id = randomUUID()
            // @ts-ignore

        },
        async data(socket, data) {
            //// @ts-ignore
            // pool.checkoutWorkerAsync(true).then((worker)=>{
                // worker.postMessage(data)
                // worker.once("message", (result)=>{
                //     if(result === "done"){
                //         result = undefined
                //         // @ts-ignore
                //         data = undefined
                //         pool.checkinWorker(worker)
                //     }
                // })
            // })
            subProcess.send(data)
        },
        drain(socket) {},
        close(socket) {},
        error(socket, error) {},
    }
});


