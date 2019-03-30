const db = require("../../dbConnection");


const SeminarGroup = {
    
    start:function(termin, group, uniqueData, callback){
        return db.query("INSERT INTO `GroupTermins` (`groupTerminsID`, `termin`, `group`, `created`, `updated`, `lastLookup`, `uniqueData`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?); SELECT groupTerminsID as insertId FROM `GroupTermins` WHERE uniqueData = ? ;", [termin, group, uniqueData, uniqueData], callback);
    },

    getID:function(termin, group, uniqueData, callback){
        return db.query("INSERT INTO `GroupTermins` (`groupTerminsID`, `termin`, `group`, `created`, `updated`, `lastLookup`, `uniqueData`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?) ON DUPLICATE KEY UPDATE `groupTerminsID` = LAST_INSERT_ID(`groupTerminsID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID'; ;", [termin, group, uniqueData], callback);
    }
    
    

}

module.exports = SeminarGroup;