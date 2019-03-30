const db = require("../../dbConnection");


const Model = {

    getID:function(JSON_Object, callback){
        return db.query("INSERT INTO `preprocessed_Event_Data` (`ppedID`, `jsonObject`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `ppedID` = LAST_INSERT_ID(`ppedID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';", [JSON_Object], callback)
    },

    selectAllRows:function(callback){
        return db.query("SELECT * FROM `preprocessed_Event_Data` WHERE 1", callback);
    }
}

module.exports = Model;