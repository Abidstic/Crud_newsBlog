const res = require("express/lib/response");
const News = require("../Models/news");
const User = require("../Models/user");

exports.addNews = async (req, res) => {
    console.log("inside add news");

    try {
        const client = {
            title: req.body.title,
            uploader: req.userID,
            uploader_name: req.userName,
            body: req.body.body,
            uploaded_on: new Date().getTime(),
        };
        console.log(client);
        const news = await News.create(client);
        res.status(201).json({ id: news.id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({ attributes: ["id"] });
        console.log("news", news);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// exports.getNewsByUser = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id: req.userID,
//             },
//         });

//         const newsList = await News.findAll({
//             where: {
//                 uploader_name: user.username,
//             },
//         });
//         res.status(200).json(newsList);
//     } catch {
//         res.status(500).json("Something went wrong!");
//     }
// };

exports.getNewsById = async (req, res) => {
    const id = req.params.newsID;
    try {
        const news = await News.findByPk(id);
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.EditNews = async (req, res) => {
    const id = req.params.news;
    try {
        await News.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            { where: { id } }
        );
        res.status(200).json({
            message: "News Edited and updated successfully !!!",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getNewsByUser = async (req, res) => {
    try {
        const news = await News.findAll({
            attributes: ["id"],
            where: { uploader_name: req.userName },
        });
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deletenews = async (req, res) => {
    const id = req.params.news;
    try {
        await News.destroy({
            where: { id },
        });
        res.status(204).json({ message: "News Deleted Successfully..." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
