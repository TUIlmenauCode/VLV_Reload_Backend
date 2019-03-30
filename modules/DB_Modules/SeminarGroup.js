const db = require("../../dbConnection");

const SeminarGroup = {
    write:function(name, course, semester, callback){
        return db.query("INSERT INTO `SeminarGroup` (`seminarGroupID`, `name`, `semester`, `course`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)", [name, semester, course], callback);
    },

    exist_Name:function(name, callback){
        return db.query("SELECT seminarGroupID FROM `SeminarGroup` WHERE name = ?", [name], callback);
    },

    setSelected:function(rowID, callback){
        return db.query("UPDATE `SeminarGroup` SET `lastLookup`= CURRENT_TIMESTAMP() WHERE seminarGroupID = ?", rowID, callback);
    }, 

    selectAll_names_ID:function(callback){
        return db.query("SELECT seminarGroupID, name FROM `SeminarGroup` WHERE1", callback);
    },

    getID:function(name, course, semester, callback){
        return db.query("INSERT INTO `SeminarGroup` (`seminarGroupID`, `name`, `semester`, `course`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `seminarGroupID` = LAST_INSERT_ID(`seminarGroupID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';", [name, semester, course], callback);
    },
}

module.exports = SeminarGroup;