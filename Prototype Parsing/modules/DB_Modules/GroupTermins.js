const db = require("../../dbConnection");


const SeminarGroup = {
    
    start:function(termin, group, uniqueData, callback){
        return db.query("INSERT INTO `GroupTermins` (`groupTerminsID`, `termin`, `group`, `created`, `updated`, `lastLookup`, `uniqueData`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?); SELECT groupTerminsID as insertId FROM `GroupTermins` WHERE uniqueData = ? ;", [termin, group, uniqueData, uniqueData], callback);
    }
    
    

}

module.exports = SeminarGroup;