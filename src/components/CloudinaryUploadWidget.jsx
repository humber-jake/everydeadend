import { useEffect, useRef } from "react";
import exifr from "exifr";
import supabase from "../utils/supabase";

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  const logEXIF = async (image) => {
    console.log(`image:`);
    console.log(image);
    const result = await exifr.gps(image);
    return result;
  };

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          async (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Upload successful:", result.info);
              setPublicId(result.info.public_id);
              const { latitude, longitude } = await logEXIF(result.info.url);
              console.log(latitude, longitude);
              const { error } = await supabase.from("images").insert({
                url: result.info.url,
                latitude: latitude,
                longitude: longitude,
              });
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
