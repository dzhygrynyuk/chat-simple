const express = require('express');

const port = 3333;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket}`);
});

app.listen(port, (err) => {
    if(err){
        throw Error(err);
    }

    console.log(`Server is running on port ${port}`);
})