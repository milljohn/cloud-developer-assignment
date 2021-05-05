// I reused the logging portion from one of my projects, I'm not sure of a citation
// The file picker was modified form this source: https://www.educative.io/edpresso/file-upload-in-react



import './App.css';
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const axios = require('axios')

const url = "http://localhost:5000/upload";
// import React from 'react'
const socket = io(url, { secure: false, reconnection: true, rejectUnauthorized: false });

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
  const [file, setFile] = useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("File selected...");
    console.log('selectedFile:', selectedFile);
      console.log('path:', selectedFile.name)

    // socket.emit("message", "file selected...")


    // Add code here to upload file to server
    // socket.emit("file", {"file" : event.target.files[0]})
    // This is not working correctly
      const request_config = {
          method: 'post',
          url: 'http://localhost:5000/upload',
          headers: {
              'Content-Type': 'multipart/form-dataitem'
          },
          data: {
              file: selectedFile
          }
      }
      // todo: verify CORS is the problem
      axios(request_config).then(res => {
          console.log(`statusCode: ${res.statusCode}`)
          console.log(res)
      }).catch(error => {
          console.log(error)
      })

      // axios.post(url,
      //     selectedFile,
      //     {
      //       headers: {
      //         'Content-Type': 'multipart/form-dataitem'
      //       }
      //     }).then(res => {
      //     console.log(`statusCode: ${res.statusCode}`)
      //     console.log(res)
      // }).catch(error => {
      //     console.log(error)
      // })

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
          {/*TODO: read values from stuff  */}
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
