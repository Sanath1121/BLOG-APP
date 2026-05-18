import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog_users", timeout: 60000 }, 
        (err, result) => {
          if (err) {
            console.error("[CLOUDINARY] Upload error:", err);
            return reject(err);
          }
          console.log("[CLOUDINARY] Upload success");
          resolve(result);
        }
      );
      
      stream.on('error', (err) => {
        console.error("[CLOUDINARY] Stream error:", err);
        reject(err);
      });
      
      stream.end(buffer);
    } catch (err) {
      console.error("[CLOUDINARY] Exception:", err);
      reject(err);
    }
  });
};
