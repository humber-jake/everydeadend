import { useEffect, useRef } from "react";
import exifr from "exifr";
import supabase from "../utils/supabase";

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  const getGPSData = async (image) => {
    const result = await exifr.parse(image);
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
              setPublicId(result.info.public_id);
              const { latitude, longitude } = await getGPSData(
                result.info.secure_url
              );
              if (!latitude || !longitude) {
                console.log(
                  `Error: no GPS data for ${result.info.original_filename}`
                );
                const { error } = await supabase
                  .from("rejected_images")
                  .insert({
                    url: result.info.secure_url,
                    filename: result.info.original_filename,
                    public_id: result.info.public_id,
                  });
              } else {
                const { error } = await supabase.from("images").insert({
                  url: result.info.secure_url,
                  latitude: latitude,
                  longitude: longitude,
                });
              }
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
