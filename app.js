const NODE_ENV = "production";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
console.log(process.env.DB_username);
console.log(process.env.DB_password);
console.log(process.env.gmap_api);
