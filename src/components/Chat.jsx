import React from "react";
import socket from "../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
    const [messageValue, setMessageValue] = React.useState('');

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName, 
            text: messageValue,
        });
        onAddMessage({
            userName, 
            text: messageValue
        });
        setMessageValue('');
    }

    return(
        <div className="chat">
            <div className="chat-users">
                <span>Room: <b>{roomId}</b></span>
                <hr />
                <b>Users ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={`user-name_${index}`}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={`message-item_${index}`} className="message">
                            <p>{message.text}</p>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
                    <textarea 
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        className="form-control"
                        rows='3'></textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-primary">Send</button>    
                </form>
            </div>
        </div>
    );
}

export default Chat;