import React from "react";
import axios from "axios";
import socket from "../socket";

function JoinBlock() {
    const [roomId, setRoomId] = React.useState('');
    const [name, setName] = React.useState('');

    const onEnter = () => {
        if(!roomId && !name){
            return alert('Some form inputs are invalid!!!');
        }

        axios.post('/rooms', {
            roomId,
            name
        });
    }

    return(
        <div className="join-block">
            <input 
                type="text" 
                placeholder="Room ID" 
                value={roomId} 
                onChange={e => setRoomId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Your name" 
                value={name} 
                onChange={e => setName(e.target.value)}
            />
            <button onClick={onEnter} className="btn btn-success">Login</button>
        </div>
    );
}

export default JoinBlock;