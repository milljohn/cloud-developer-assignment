// I reused the logging portion from one of my projects, I'm not sure of a citation
// The file picker was modified form this source: https://www.educative.io/edpresso/file-upload-in-react


import './App.css';
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import FormData from 'form-data'

const axios = require('axios')

const url = "http://localhost:5000/upload";
const socket = io(url, {secure: false, reconnection: true, rejectUnauthorized: false});

function App() {
    const [socketMessage, setSocketMessage] = useState("");

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

        socket.onAny((event, ...args) => {
            // const message = JSON.parse(event);
            console.log(`Got socket event: ${event} with args: ${args}`)
        });
        socket.on("upload", (args) => {
            console.log('socket message received', args);
            console.log(`socket message:: filename: ${args.filename}`);
            setSocketMessage(args);
        });
    }, []);
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [response, setResponse] = useState('');

    // Handles file upload event and updates state
    function handleUpload(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log("File selected...");

        const form = new FormData();
        form.append('file', selectedFile);

        const request_config = {
            method: 'post',
            url: 'http://localhost:5000/upload',
            headers: {'Content-Type': 'multipart/form-data'},
            data: form
        }

        axios(request_config).then(res => {
            console.log(`Request Response statusCode: ${res.status}`);
            console.log(`Request Response: ${res}`);
            setResponse(res);
        }).catch(error => {
            console.log(error)
        })

    }

    return (
        <div className="App">
            <header className="App-header">
                {/*<input type="file" name="file" onChange={this.onChangeHandler}/>*/}
                <div id="upload-box">
                    <input type="file" onChange={handleUpload}/>
                    <p>Client Side:</p>
                    <p>Filename: {file.name}</p>
                    <p>File type: {file.type}</p>
                    <p>File size: {file.size} bytes</p>
                    {file && <ImageThumb image={file}/>}

                    <div>
                        <p>Socket Response:</p>
                        <p>Filename: {socketMessage ? socketMessage.filename : null}</p>
                        <p>File Size: {socketMessage ? socketMessage.filesize : null}</p>
                    </div>
                    <div>
                        <p>Request Response:</p>
                        <p>Filename: {response ? response.filename : null}</p>
                        <p>File Size: {response ? response.filesize : null}</p>
                    </div>
                    {/*<p>{res && <ResponseMessage resp={res} />}</p>*/}
                </div>
                {}
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
const ImageThumb = ({image}) => {
    return <img src={URL.createObjectURL(image)} alt={image.name}/>;
};

// const ResponseMessage = ({ resp }) => {
//
//     return <p> Filesize: {resp.data.file_size}</p>
// }
//
export default App;
