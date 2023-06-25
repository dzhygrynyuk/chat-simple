import React from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3333/');

function App() {
  return (
    <div className="App">
      <h1>Hello Node</h1>
    </div>
  );
}

export default App;
