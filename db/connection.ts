import { Sequelize } from "sequelize";

const db = new Sequelize("bsale_test", "bsale_test", "bsale_test", {
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  dialect: "mysql",
  dialectOptions: { connectTimeout:  4000 },
  pool: {
    max: 20,
    min: 0,
    idle: 15000,
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },

  // logging: false,
});
export default db;