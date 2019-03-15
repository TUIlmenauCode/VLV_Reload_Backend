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
    }
}

module.exports = SeminarGroup;