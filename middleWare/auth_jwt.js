const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
     const token = req.headers.authorization;
    
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        const userID = decoded.userId;
        
        

        if (!userID) {
            console.log("user id thik ase");
            return res
                .status(401)
                .json({ message: "You are not authorized to access !!!" });
                
        }
        req.userID= userID;
        req.userName = decoded.username;
    } catch (error) {
        
        return res
            .status(401)
            .json({ message: "You are not authorized to access !!!" });
    }

    next();
};
