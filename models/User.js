import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});
// Next.js often runs in a development environment with hot-reloading. This means your app code can be reloaded multiple times during development, which can lead to the same model being defined multiple times, causing errors.
// Without this pattern, on every hot-reload, Mongoose might attempt to define the User model again, resulting in an error
// This ensures that if the model is already registered (i.e., it exists in models), it won’t try to define it again.
const User = models.User || model("User", UserSchema);
export default User;
