import cloudinary from "./cloudinary";
import supabase from "./supabase";

// one time util to populate newly added public_id col in images table
async function syncPublicIds() {
  const cloudinaryImages = await cloudinary.api.resources({
    max_results: 1000,
  });
  cloudinaryImages.resources.forEach(async (image) => {
    const { data, error } = await supabase
      .from("images")
      .update({
        public_id: image.public_id,
      })
      .eq("url", image.secure_url)
      .select();

    console.log(data);
    console.log(error);
  });
}

syncPublicIds();
