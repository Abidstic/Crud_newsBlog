const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        news: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        last_news: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
    },
    {
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
    }
);

module.exports = User;
