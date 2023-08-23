import { Router } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { dbCollection } from "../database/database.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const uploadResult = await cloudinary.uploader.upload(file.path);
        await dbCollection.files.insertOne({
            filename: uploadResult.original_filename,
            cloudinary_id: uploadResult.public_id,
            url: uploadResult.secure_url,
            createdAt: new Date(),
        });
        res.status(200).json({
            message: "File uploaded successfully",
            url: uploadResult.secure_url,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});

export default router;
