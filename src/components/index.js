import React, { useRef, useState } from "react";
import JSZip from "jszip";
import throttle from "lodash.throttle";
import { saveAs } from "file-saver";

const UploadFolder = () => {
    const inputRef = useRef(null);
    const [progress, setProgress] = useState(-1);

    const onZipUpdate = (metadata) => {
        setProgress(metadata.percent);
        console.log("progression: " + metadata.percent.toFixed(2) + " %");
        if (metadata.currentFile) {
            console.log("current file = " + metadata.currentFile);
        }
    };
    const throttledZipUpdate = throttle(onZipUpdate, 50);


    const uploadFoler = async (event) => {
        const zip = new JSZip();
        const files = Array.from(event.target.files);
        console.log("FILES", files);

        files.forEach((file) => {
            zip.file(file.webkitRelativePath, file);
        });

        zip
            .generateAsync({ type: "blob" }, throttledZipUpdate)
            .then(function (content) {
                console.log("content", content);
                const formData = new FormData();
                formData.append("folderzip", content);
                console.log("ready to send to server", content);
            })
            .catch((e) => console.log(e));
    }

    return (
        <div>
            <h1>Folder upload</h1>
            <h2>Select a folder to send to the server</h2>
            <input directory="" webkitdirectory="" type="file" onChange={(e) => uploadFoler(e)} />
        </div>
    );
}

export default UploadFolder;
