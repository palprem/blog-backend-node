const Blog = require("../models/blog");
const Comment = require("../models/comment");

const createBlog = async (req, res, next) => {

    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            body: content,
            title,
            coderImageURL: `uploads/${req.file.filename}`,
            createdBy: req.user._id
        })

        return res.status(200).json({
            succes: true,
            message: "Blog saved successfully!",
            data: { id: blog._id }
        });
    } catch (error) {
        next(error)
    }
}

const getBlogs = async (req, res, next) => {
    try {
        const blogList = await Blog.find({}).sort({ "createdAt": -1 });
        return res.status(200).json({
            succes: true,
            message: "Blog fetched successfully!",
            data: blogList
        });
    } catch (error) {
        next(error)
    }
}

const getBlogById = async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("createdBy", "_id fullName email profileImageURL role");
    const comments = await Comment.find({ blogId });

    return res.status(200).json({
        succes: true,
        data: { blog, comments },
        message: "Data fetched successfully!"
    })
}

const createBlogComments = async (req, res, next) => {
    const { title } = req.body;
    const blogId = req.params.blogId;

    if (!blogId || !title) return res.status(400).json({
        succes: false,
        message: "All fileds are required!"
    })
    const comment = await Comment.create({
        content: title,
        blogId,
        createdBy: req.user._id
    });

    res.status(200).json({
        succes: true,
        message: "Comment saved successfully",
        id: comment._id
    })
}
module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    createBlogComments,
}