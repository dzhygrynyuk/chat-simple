import React from "react";
import socket from './socket';
import axios from "axios";

import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    });
  }

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  return (
    <div className="wrapper">
      {!state.isAuth ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} onAddMessage={addMessage} />}
    </div>
  );
}

export default App;
