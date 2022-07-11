const Sequelize=require('sequelize');
const sequelize=new Sequelize('crud_newsBlog','root','',{
    dialect: "mysql",
    host:"localhost"
});

module.exports=sequelize;

