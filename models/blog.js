const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "blog.jpg",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    default:"60d5ec49f1d3a3ef0abc123"
  },
},
{
    timestamps:true
});

const Blog = mongoose.model("Blogs", BlogSchema);

module.exports = Blog;
