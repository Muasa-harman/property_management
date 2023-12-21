import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "lh3.googleusercontent.com/a/ACg8ocKl5Vo9gwC0FzIFvD7bZgFF-1RPQJe2yHflgcI3STXAloc=s96-c",
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

export default User;