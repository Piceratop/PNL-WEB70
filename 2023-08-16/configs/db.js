import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
