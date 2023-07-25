import React from "react";
import socket from './socket';

import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM:JOIN', obj);
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log('New user', users);
    });
  }, []);

  return (
    <div className="wrapper">
      {!state.isAuth && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
