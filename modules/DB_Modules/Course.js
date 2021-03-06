const db = require("../../dbConnection");

const Course = {

    write:function(name, short, degree, callback){
        return db.query("INSERT INTO `Course` (`courseID`, `name`, `short`, `degree`, `created`, `updated`, `lastSelected`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)", [name, short, degree], callback);
    },

    exist_NameShortDegree:function(name, short, degree, callback){
        return db.query("SELECT courseID FROM `Course` WHERE name = ? AND short = ? AND degree = ? ", [name, short, degree], callback);
    },

    setSelected:function(rowID, callback){
        return db.query("UPDATE `Course` SET `lastLookup`= CURRENT_TIMESTAMP() WHERE courseID = ?", rowID, callback);
    },

    getID_fromName:function(name, callback){
        return db.query("SELECT `courseID` FROM `Course` WHERE short = ? ;", [name], callback)
    },

    getID(course_name, short, degree, callback){
        return db.query("INSERT INTO `Course` (`courseID`, `name`, `short`, `degree`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `courseID` = LAST_INSERT_ID(`courseID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';",[course_name, short, degree], callback);  
    }

    


}

module.exports = Course