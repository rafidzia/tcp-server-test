// @ts-ignore
onmessage = (event: MessageEvent) => {
    let data = Buffer.from(event.data).toString()
};

setTimeout(()=>{
    Bun.gc(true)
}, 60000)
