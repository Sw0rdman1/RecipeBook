import React, { useState, useEffect, ChangeEvent } from "react";
import { Avatar } from "@mui/material";
import "./ImageUpload.css";

interface ImageUploadProps {
  imageUpload: File | undefined;
  setImageUpload: (file: File | undefined) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUpload,
  setImageUpload,
}) => {
  const [preview, setPreview] = useState<string | undefined>();

  const changePictureHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImageUpload(undefined);
      return;
    }
    setImageUpload(event.target.files[0]);
  };

  useEffect(() => {
    if (!imageUpload) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(imageUpload);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageUpload]);

  return (
    <div className="upload-image">
      <div className="personal-image">
        <label className="label">
          <input
            id="contained-button-file"
            className="image-input"
            type="file"
            onChange={changePictureHandler}
          />
          <figure className="personal-figure">
            <Avatar
              src={preview}
              style={{
                width: "110px",
                height: "110px",
              }}
              className={
                imageUpload
                  ? "personal-avatar green-border"
                  : "personal-avatar "
              }
            />
            <figcaption className="personal-figcaption">
              <img
                src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                alt="Camera Icon"
              />
            </figcaption>
          </figure>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
