const express = require('express');

const app = express();
const port = 3333;

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
})

app.listen(port, (err) => {
    if(err){
        throw Error(err);
    }

    console.log(`Server is running on port ${port}`);
})