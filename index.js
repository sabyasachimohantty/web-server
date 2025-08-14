import net from 'net';
import fs from 'fs/promises';

const server = net.createServer((socket) => {
    socket.on('data', async (data) => {
        try {
            const req = data.toString().split('\n');
            console.log(req);
            let path = req[0].split(" ")[1];
            if (path === '/') {
                path = '/index.html'
            }
    
            const reponseBody = await fs.readFile(`./www${path}`, 'utf-8');
            const response = `HTTP/1.1 200 OK\r\n\r\n${reponseBody}`;
            socket.write(response, () => {
                socket.end();
            });
        } catch (error) {
            if (error.code = 'ENOENT') {
                socket.write(`HTTP/1.1 404 Not Found\r\n`, () => {
                    socket.end();
                })
            } else {
                socket.write(`HTTP/1.1 500 Server Error\r\n`, () => {
                    socket.end();
                })
            }
        }
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