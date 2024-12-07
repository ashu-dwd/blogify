const Blog = require("../models/blog");

const handleBlogUploading = async (req, res) => {
  try {
    const { title, desc, content } = req.body;
    const coverImages = req.files;

    // Check if cover images are provided
    let coverImagePaths = [];
    if (coverImages && coverImages.length > 0) {
      coverImagePaths = coverImages.map(
        (image) => `/coverImages/${image.filename}`
      );
    }

    const result = await Blog.create({
      title,
      desc,
      content,
      coverImage: coverImagePaths, // Store the paths to the images
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Blog Upload Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  handleBlogUploading,
};
