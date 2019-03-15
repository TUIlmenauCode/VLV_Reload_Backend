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
    }
}

module.exports = Semester;