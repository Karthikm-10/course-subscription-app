import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: {
    type: String,
    required: true
  }
});


export default mongoose.model("Course", courseSchema);
