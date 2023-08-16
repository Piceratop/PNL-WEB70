import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: [3, "Username is too short"],
            maxlength: [40, "Username is too long"],
            validate: {
                validator: function (value) {
                    const regex = /^[a-zA-Z0-9]+$/;
                    return regex.test(value);
                },
                message: "Username can only contain alphanumeric characters",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (value) {
                    const regex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return regex.test(value);
                },
                message: "Invalid email address",
            },
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        //What can go here?
    }
);

userSchema.pre("validate", function (next) {
    const validationError = this.validateSync();
    if (validationError) {
        console.error(validationError);
    }
    next();
});
