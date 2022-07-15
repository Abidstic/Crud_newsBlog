const News = require("../models/news");

module.exports = (req, res, next) => {
    const newsID = req.params.news;
    const uploader = req.userID;
    
    News.findByPk(newsID)
        .then((news) => {
            
            if (news.uploader !== uploader) {
                return res.status(403).json({
                    message: "You are not Authorized to edit this news",
                });
            }
           
            next();
        })
        .catch((err) => {
            
            res.status(500).json({
                error: "Not the author of the news",
                
            });
        });
};
