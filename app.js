import net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        let result = data.toString();
    });
})

server.listen(8080, () => {
    console.log('server is running at localhost:8080');
})