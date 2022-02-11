import React, { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import Slider from "rc-slider";
import "./slider.css";
import { sendRequest } from "../../common/sendRequest";

export const ProfileAvatarEditor = () => {
  const [scale, setScale] = useState<number>(1);
  let avatarEditor: AvatarEditor;
  const setEditorRef = (editor: AvatarEditor) => (avatarEditor = editor);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  const getProfileImage = () => {
    const url = "/api/v1/appid/profile/avatar";
    return sendRequest({ url: url, method: "GET" });
  };

  useEffect(() => {
    getProfileImage().then((response: Response) => {
      response.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
        const file = new File([arrayBuffer], "avatar.png");
        if (file.size > 1000) {
          acceptedFiles[0] = file;
        }
      });
    });
  }, []);

  const onSliderChange = (value: number) => {
    setScale(value);
  };

  const handleSaveAvatarClick = (): void => {
    const canvasScaled = avatarEditor.getImageScaledToCanvas();
    canvasScaled.toBlob((blob: Blob | null) => {
      // send the image to the api
      const formData = new FormData();
      formData.append("data", blob ? blob : "");
      const url = "/api/v1/appid/profile/avatar";
      sendRequest({
        url: url,
        method: "PUT",
        body: formData,
        headers: {},
      }).then((response: Response) => {
        if (response.ok) {
          alert("success");
        }
      });
    });
  };

  const files = acceptedFiles.map((file: File) => (
    <>
      <AvatarEditor
        ref={setEditorRef}
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
      <button type="button" onClick={handleSaveAvatarClick}>
        Save Profile Picture
      </button>
    </>
  ));

  return (
    <div style={{ marginLeft: "20px" }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <button type="button" onClick={open}>
          Load Profile Picture
        </button>
        {files.length > 0 ? (
          <aside>{files}</aside>
        ) : (
          <div className="square">Drag and drop a file or open the select file dialog</div>
        )}
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
