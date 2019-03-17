const db = require("../../dbConnection");


const Prof = {

    start:function(name,  callback){
        return db.query("INSERT IGNORE INTO `Prof` (name) VALUES (?); SELECT profID as insertId FROM `Prof` WHERE name = ? ;", [name, name], callback);
    }

}

module.exports = Prof;