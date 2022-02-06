import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import Slider from "rc-slider";
import "./slider.css";

export const ProfileAvatarEditor = () => {
  const [scale, setScale] = useState<number>(1);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  const onSliderChange = (value: number) => {
    setScale(value);
  };

  const files = acceptedFiles.map((file: File) => (
    <>
      <AvatarEditor
        width={125}
        scale={scale}
        border={5}
        borderRadius={100}
        height={125}
        image={file}
      />
      <div style={{ display: "flex" }}>
        Scale: <Slider min={1} max={8} onChange={onSliderChange} />
      </div>
    </>
  ));

  return (
    <div style={{ marginLeft: "20px" }}>
      <div {...getRootProps({ className: "dropzone" })}>
        {files.length > 0 ? (
          <aside>{files}</aside>
        ) : (
          <div className="square">Drag and drop a file or open the select file dialog</div>
        )}
        <button type="button" onClick={open}>
          Select File
        </button>
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
