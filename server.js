const express = require('express');

const port = 3333;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if(!rooms.has(roomId)){
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    res.send();
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.broadcast.to(roomId).emit('ROOM:JOINED', users);
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if( value.get('users').delete(socket.id) ){
                const users = [...value.get('users').values()];
                socket.broadcast.to(roomId).emit('ROOM:DISCONNECTED', users);
            }
        });
    });

    console.log(`User connected: ${socket.id}`);
});

server.listen(port, (err) => {
    if(err){
        throw Error(err);
    }

    console.log(`Server is running on port ${port}`);
})