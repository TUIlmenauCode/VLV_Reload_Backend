const db = require("../../dbConnection");


const Room = {
    start:function(name, callback){
        return db.query("INSERT IGNORE `Room` (`roomID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL); SELECT roomID as insertId FROM `Room` WHERE name = ?;", [name, name], callback)
    }
}
module.exports = Room