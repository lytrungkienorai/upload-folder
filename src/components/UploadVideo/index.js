import { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [chunkCounter, setChunkCounter] = useState(0);
  const url = "https://sandbox.api.video/upload?token=to1R5LOYV0091XN3GQva27OS";

  const uploadVideo = async (event) => {
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

    const chunkForm = new FormData();

    while (start < file.size) {
      console.log(++chunkCounter + " File from " + start + " - " + chunkEnd);
      const chunk = file.slice(start, chunkEnd);
      chunkForm.append("file", chunk, filename); //chunkForm will send to backend

      start += chunkSize;
      chunkEnd = Math.min(start + chunkSize, file.size);
    }

    await sendVideo(chunkForm);
  };

  const sendVideo = async (chunkForm) => {
    for (const value of chunkForm.values()) {
      console.log("form data", value);
    }

    const url = "";
    try {
      const res = await axios.post(url, chunkForm);
      console.log(res);
    } catch (error) {
      console.log(error);
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
