import cloudinary from "./cloudinary";
import supabase from "./supabase";

export default async function deleteImage(publicId, markers) {
  console.log(publicId);
  const { data, error } = await supabase
    .from("images")
    .delete()
    .eq("public_id", publicId)
    .select();

  cloudinary.uploader
    .destroy(publicId, function (error, result) {
      console.log(result, error);
    })
    .then((resp) => console.log(resp))
    .catch((_err) =>
      console.log("Something went wrong, please try again later.")
    );

  console.log("destroyed image.");
  console.log("===============");

  delete markers[publicId];
}
