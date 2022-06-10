const Sequelize=require('sequelize');
const sequelize=new Sequelize('crud_newsBlog','root','1312752397',{
    dialect: "mysql",
    host:"localhost"
});

module.exports=sequelize;

