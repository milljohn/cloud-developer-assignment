// I reused the logging portion from one of my projects, I'm not sure of a citation
// The file picker was modified form this source: https://www.educative.io/edpresso/file-upload-in-react



import './App.css';
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

const URL = "http://localhost:5000/upload";
// import React from 'react'
const socket = io(URL, { secure: false, reconnection: true, rejectUnauthorized: false });

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
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
    console.log("File selected...")


    // Add code here to upload file to server
    socket.emit("file", {"file" : event.target.files[0]})
    // This is not working correctly
  }
  return (
    <div className="App">
      <header className="App-header">
        {/*<input type="file" name="file" onChange={this.onChangeHandler}/>*/}
        <div id="upload-box">
      <input type="file" onChange={handleUpload} />
          <p>Client Side:</p>
          <p>Filename: {file.name}</p>
          <p>File type: {file.type}</p>
          <p>File size: {file.size} bytes</p>
          {file && <ImageThumb image={file} />}

          <p>Server Side:</p>
          {/*{}*/}
    </div>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
    </div>
  );
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

export default App;
