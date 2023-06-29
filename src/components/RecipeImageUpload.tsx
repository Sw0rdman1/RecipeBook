import React, { useState, useRef } from "react";

interface RecipeImageUploadProps {
  setImageUpload: (file: File | undefined) => void;
}

const RecipeImageUpload: React.FC<RecipeImageUploadProps> = ({
  setImageUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageUpload(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      style={{
        width: "250px",
        height: "170px",
        border: "1px solid #ccc",
        marginTop: "20px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {selectedImage ? (
        <>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/338/338106.png"
            alt="Camera Icon"
            style={{ width: "70px", height: "70px", paddingBottom: "10px" }}
          />
          <p>Select an image</p>
        </div>
      )}
    </div>
  );
};

export default RecipeImageUpload;
