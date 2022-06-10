const http = require("http");
const app = require("./app");
const sequelize = require("./utils/database");

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const User = require("./Models/user");
const News = require("./Models/news");

const startServer = async (server) => {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

startServer(server);
