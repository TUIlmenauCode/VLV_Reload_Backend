const db = require("../../dbConnection");


const Prof = {

    start:function(name,  callback){
        return db.query("INSERT IGNORE INTO `Prof` (name) VALUES (?); SELECT profID as insertId FROM `Prof` WHERE name = ? ;", [name, name], callback);
    },

    getID:function(name, callback){
        return db.query("INSERT IGNORE INTO `Prof` (name) VALUES (?) ON DUPLICATE KEY UPDATE `profID` = LAST_INSERT_ID(`profID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';")
    },

}

module.exports = Prof;