import { useState } from "react";

const UploadVideo = () => {
  const [chunkCounter, setChunkCounter] = useState(0);
  const url = "https://sandbox.api.video/upload?token=to1R5LOYV0091XN3GQva27OS";

  const uploadVideo = (event) => {
    const files = Array.from(event.target.files);
    console.log("FILES", files);

    const file = files[0];
    const filename = files[0].name;
    //break into 2 MB chunks fat minimum
    const chunkSize = 1024 * 1024 * 2;

    let numberofChunks = Math.ceil(file.size / chunkSize);
    console.log("There will be " + numberofChunks + " chunks uploaded.");

    let start = 0;
    let chunkEnd = Math.min(start + chunkSize, file.size);
    let chunkCounter = 0;

    while (start < file.size) {
      console.log(++chunkCounter + " File from " + start + " - " + chunkEnd);
      const chunk = file.slice(start, chunkEnd);
      const chunkForm = new FormData();
      chunkForm.append("file", chunk, filename); //chunkForm will send to backend

      for (const value of chunkForm.values()) {
        console.log("form data", value);
      }

      start += chunkSize;
      chunkEnd = Math.min(start + chunkSize, file.size);
      
    }
  };

  return (
    <div>
      <h1>Upload video</h1>
      <input type="file" onChange={(e) => uploadVideo(e)} />
    </div>
  );
};

export default UploadVideo;
