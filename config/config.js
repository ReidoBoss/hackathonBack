const { createPool } = require("mysql");

const con = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hack",
});


module.exports = con;
