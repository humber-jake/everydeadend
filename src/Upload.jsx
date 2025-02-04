import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./components/CloudinaryUploadWidget";
import "./App.css";
import supabase from "./utils/supabase";
import { Link } from "react-router";

const Upload = () => {
  const [dragover, setDragover] = useState(false);

  const [data, setTodos] = useState([]);

  // Configuration
  // const uploadPreset = "default";

  // State
  const [publicId, setPublicId] = useState("");

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    multiple: true,
    folder: "everydeadend",
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    clientAllowedFormats: ["images"],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  return (
    <div className="uploadRoute">
      <Link className="homeLink" to="/">
        Back to Map
      </Link>
      <h3>Upload Dead Ends</h3>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
    </div>
  );
};

export default Upload;
