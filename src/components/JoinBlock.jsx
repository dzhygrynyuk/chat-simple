import React from "react";
import axios from "axios";
import socket from "../socket";

function JoinBlock({ onLogin }) {
    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    const onEnter = async () => {
        if(!roomId && !userName){
            return alert('Some form inputs are invalid!!!');
        }

        setLoading(true);
        await axios.post('/rooms', {
            roomId,
            userName
        });
        onLogin();
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
                value={userName} 
                onChange={e => setUserName(e.target.value)}
            />
            <button onClick={onEnter} disabled={isLoading} className="btn btn-success">
                {isLoading ? 'Loading...' : 'Login'}
            </button>
        </div>
    );
}

export default JoinBlock;