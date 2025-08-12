import net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const req = data.toString().split('\n');
        console.log(req);
        const path = req[0].split(" ")[1];

        const reponseBody = `Requested path: ${path}\r\n`;
        const response = `HTTP/1.1 200 OK\r\n\r\n${reponseBody}`;
        socket.write(response, () => {
            socket.end();
        });
    })

    socket.on('end', () => {
        console.log('Client disconnected');
    })

    socket.on('error', (err) => {
        console.log(`Socket error: ${err.message}`)
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
    if (err) {
        console.log(`Error while running server: ${err.message}`);
        return
    }
    console.log(`SERVER is successfully running on port ${PORT}`)
})