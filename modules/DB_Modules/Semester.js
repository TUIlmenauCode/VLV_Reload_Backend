const db = require("../../dbConnection");

const Semester = {
    write:function(name, callback){
        return db.query("INSERT INTO `Semester` (`fachSemesterID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)", [name], callback);
    },

    exist_Name:function(name, callback){
        return db.query("SELECT fachSemesterID FROM `Semester` WHERE name = ?", [name], callback);
    },

    setSelected:function(rowID, callback){
        return db.query("UPDATE `Semester` SET `lastLookup`= CURRENT_TIMESTAMP() WHERE fachSemesterID = ?", rowID, callback);
    },

    getID_fromName:function(name, callback){
        return db.query("SELECT `fachSemesterID` FROM `Semester` WHERE name = ? ;", [name], callback)
    },

    getID:function(name, callback){
        return db.query("INSERT INTO `Semester` (`fachSemesterID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `fachSemesterID` = LAST_INSERT_ID(`fachSemesterID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';",[name], callback);
    }
}

module.exports = Semester;