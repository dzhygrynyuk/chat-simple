import React from "react";

function Chat() {
    const [messageValue, setMessageValue] = React.useState('');

    return(
        <div className="chat">
            <div className="chat-users">
                <b>Users (1):</b>
                <ul>
                    <li>Test User</li>
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                </div>
                <form>
                    <textarea 
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        className="form-control"
                        rows='3'></textarea>
                    <button type="button" className="btn btn-primary">Send</button>    
                </form>
            </div>
        </div>
    );
}

export default Chat;