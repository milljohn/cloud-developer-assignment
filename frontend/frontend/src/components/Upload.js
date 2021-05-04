// Citation: https://medium.com/@steven_creates/uploading-files-to-s3-using-react-js-hooks-react-aws-s3-c4c0684f38b3

import React, { useRef } from 'react';

function Upload() {
    const fileInput = useRef();

    const handleClick = event => {
        event.preventDefault();
        console.log(fileInput.current)
        // file to upload to s3
        let file = fileInput.current.files[0];
        let newFileName = fileInput.current.files[0].name;

        // read from .env
        const config = {
            bucketName:
                process.env.REACT_APP_BUCKET_NAME,dirName:
                process.env.REACT_APP_DIR_NAME /* optional */,region:
                process.env.REACT_APP_REGION,accessKeyId:
                process.env.REACT_APP_ACCESS_ID,secretAccessKey:
                process.env.REACT_APP_ACCESS_KEY,
        };
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then(data => {
            console.log(data);
            if (data.status == 204) {
                console.log("success");

            }else  {
                console.log("fail");
            }
        })
    }
    return (
        <>
            <form className='upload-steps' onSubmit={handleClick}>
                <label>
                    Upload file:
                    <input type='file' ref={fileInput}/>
                </label>
                <br/>
                <button type='submit'>Upload</button>
            </form>
        </>
    )
}

export default Upload;