const res = require("express/lib/response");
const News = require("../Models/news");

exports.addNews = async (req, res) => {
    try {
        const news = await News.create({
            title: req.body.title,
            uploader: req.userId,
            uploader_name: req.userName,
            body: req.body.body,
            uploaded_on: new Date().getTime(),
        });
        res.status(201).json({ id: news.id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({ attributes: ["id"] });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getNewsById = async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.EditNews = async (req, res) => {
    const id = req.params.blog;
    try {
        await Blog.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            { where: { id } }
        );
        res.status(200).json({
            message: "Blog Edited and updated successfully !!!",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getNewsByUser = async (req, res) => {
    const user = req.params.uploader;
    try {
        const blogs = await Blog.findAll({
            attributes: ["id"],
            where: { uploader},
        });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deletenews = async (req, res) => {
    const id = req.params.blog;
    try {
        await Blog.destroy({
            where: { id },
        });
        res.status(204).json({ message: "Blog Deleted Successfully..." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
