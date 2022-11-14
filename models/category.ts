import { DataTypes } from "sequelize";
import db from "./../db/connection";

const Category = db.define("category", {
  name: {
    type: DataTypes.STRING,
  },
  
},);

console.log(Category.tableName)

export default Category;
