import { DataTypes } from "sequelize";
import db from "./../db/connection";

const Product = db.define("product", {
  name: {
    type: DataTypes.STRING,
  },
  url_image: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.INTEGER
  }
});


export default Product;
