// @ts-ignore
onmessage = (event: MessageEvent) => {
    let data = Buffer.from(event.data).toString()
    Bun.gc(true)
};
