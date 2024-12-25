import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../../shared/types";

const userSchema = new mongoose.Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: false, sparse: true },
    address: { type: String, required: false },
    gender: { type: String, enum: ["male", "female"], required: false },
    birthday: { type: Date, required: false },
    nationality: { type: String, required: false },
    emailVerified: { type: Boolean, required: true, default: false },
    // isAdmin: { type: Boolean, required: true, default: false },
    roles: [{ type: String, required: true, default: "user" }],
});

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
