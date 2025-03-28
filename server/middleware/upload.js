import upload from "../config/upload.js";

const uploadImage = upload.single("image");

export { uploadImage };
