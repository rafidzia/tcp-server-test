import net from 'net';
import wp from 'workerpool';
var pool = wp.pool("./worker.js");
const server = net.createServer((socket) => {
    // socket.id = 
    socket.on('data', (data) => {
        pool.exec("test", [data]).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    });
});
server.listen(8080, () => {
    console.log('server is running at localhost:8080');
});
