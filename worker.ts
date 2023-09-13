// @ts-ignore
onmessage = (event: MessageEvent) => {
    let data = Buffer.from(event.data).toString()
};

setInterval(()=>{
    Bun.gc(true)
}, 60000)
