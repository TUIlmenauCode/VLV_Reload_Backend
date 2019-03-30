const db = require("../../dbConnection");


const Room = {
    start:function(name, callback){
        return db.query("INSERT IGNORE `Room` (`roomID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL); SELECT roomID as insertId FROM `Room` WHERE name = ?;", [name, name], callback)
    },

    getID:function(name, callback){
        return db.query("INSERT `Room` (`roomID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `roomID` = LAST_INSERT_ID(`roomID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';;", [name], callback)
    }
}
module.exports = Room