// // @ts-ignore
// onmessage = (event: MessageEvent) => {
//     let data = Buffer.from(event.data).toString()
//     // console.log(data)
// };

// // @ts-ignore
// onclose = () => {
//     console.log("close worker")
// }

// setInterval(()=>{
//     Bun.gc(true)
// }, 60000)

import {parentPort} from "node:worker_threads"

parentPort?.once("message", (data) => {
    let result = Buffer.from(data).toString()
})
