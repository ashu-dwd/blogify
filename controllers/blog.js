const Blog = require("../models/blog");
const User = require("../models/user");
const handleBlogUploading = async (req, res) => {
  try {
    const { title, desc, content } = req.body;
    const coverImage = req.file;

    console.log("Cover Image:", coverImage);

    // Save only the image filename to the database
    const coverImageName = coverImage ? coverImage.filename : null;

    const result = await Blog.create({
      title,
      desc,
      content,
      coverImage: coverImageName,  // Save only the filename
      author: req.user._id
    });

    console.log("Blog entry created:", result);

    res.redirect(`/blogs/${result._id}`);
  } catch (error) {
    console.error("Blog Upload Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


const handleBlogSearchById = async (req,res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    try {
      const user = await User.findById(blog.author);
      blog.authorName = user;  // Attach author details to the blog
    } catch (err) {
      console.error(`User not found for author ID: ${blog.author}`);
      blog.authorName = null;
    }
    res.render('blog', { blog: blog });
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = {
  handleBlogUploading,
  handleBlogSearchById
};
