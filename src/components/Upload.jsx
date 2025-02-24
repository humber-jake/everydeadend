import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import "../styles/App.css";
import supabase from "../utils/supabase";
import checkAuth from "../utils/checkAuth";
import { Link, useNavigate } from "react-router";

const Upload = () => {
  // State
  const [publicId, setPublicId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  let navigate = useNavigate();

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
    // clientAllowedFormats: ["images"],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  useEffect(() => {
    checkAuth(setIsLoggedIn, setIsAdmin).then((data) => {
      const [result, role] = data;
      if (role !== "admin") {
        alert(`You don't have permission to do that.`);
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="Upload">
      {isLoggedIn ? (
        <>
          <h2>Upload Dead Ends</h2>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
          />
          <Link className="controlButton" to="/">
            Back to Map
          </Link>
        </>
      ) : (
        <p>
          Please <Link to={"/login"}>login</Link> to upload new dead ends.
        </p>
      )}
    </div>

    // TODO: Add purge button to remove rejected images from cloudinary
  );
};

export default Upload;
