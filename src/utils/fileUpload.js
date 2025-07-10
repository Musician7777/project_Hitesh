import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; //Node file handling.

//Configuration.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUpload = async (filePath) =>{
  //File upload.
  try {
    if(!filePath) return null;
    //Upload the file on coulnary.
    const response = await cloudinary.uploader.upload(filePath,{
        resource_type: "auto"
      });
    //File uploaded successfully.
    console.log("File uploaded on Cloudnary", response.url);
    //Unlink the file after successful upload.
    return response;
  } catch (error) {
    fs.unlinkSync(filePath); //Removes the temp file form the disk.
    console.log("Error while uploading file");
    return null;
  }
}

export { fileUpload };