import {WorkerPool} from "@rushstack/worker-pool";
var pool = new WorkerPool({
    id: "test",
    workerScriptPath: "./worker.ts",
    maxWorkers: 1000,
})
process.on("message", (message)=>{
    pool.checkoutWorkerAsync(true).then((worker)=>{
        worker.postMessage(message)
        worker.once("message", (result)=>{
            if(result === "done") pool.checkinWorker(worker)
        })
    })
})