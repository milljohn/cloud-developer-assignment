import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:5000/upload", { secure: false, reconnection: true, rejectUnauthorized: false });

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log('Connected...');

    })
    socket.on("connect_error", (e) => {
      console.log('error:', e);

    })
    socket.on("disconnect", (reason) => {
      console.log("reason:", reason);

    })
    socket.onAny((stuff) => {
      console.log(JSON.parse(stuff));
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
