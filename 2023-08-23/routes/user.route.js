import { Router } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import { dbCollection } from "../database/database.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
    cloud_name: "dbs8tddkg",
    api_key: "231642999655899",
    api_secret: "IiAhRlMa4xUPjn9GSSUGTh2Nadw",
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
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});

export default router;
