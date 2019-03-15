var mysql = require('mysql');
var connection = mysql.createPool({
    host: "159.69.202.156",
    port     :  3306,
    user: "vlv_dev",
    password: "Lassmichrein#94",
    database: "VLV_V1",
    charset : 'utf8mb4'
});
module.exports = connection;
