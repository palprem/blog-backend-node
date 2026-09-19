const { Router } = require("express");
const multer = require("multer");
const { createBlog, getBlogs, getBlogById, createBlogComments } = require("../controllers/blog");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}=${file.originalname}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })
router
    .get("/", getBlogs)
    .get("/:id", getBlogById)
    .post("/comment/:blogId", createBlogComments)
    .post("/", upload.single("coderImageURL"), createBlog)

module.exports = router;