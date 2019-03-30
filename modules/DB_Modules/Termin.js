const db = require("../../dbConnection");


const Termin = {
    start:function(event, start, end, room, unique, callback){
        return db.query("INSERT INTO `Termin` (`terminID`, `event`, `start`, `end`, `room`, `created`, `updated`, `lastLookup`, `uniqueID`) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?); SELECT terminID as insertId FROM `Termin` WHERE uniqueID = ? ;", [event, start, end, room, unique, unique], callback)
    },

    getID:function(event, start, end, room, unique, callback){
        return db.query("INSERT INTO `Termin` (`terminID`, `event`, `start`, `end`, `room`, `created`, `updated`, `lastLookup`, `uniqueID`) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?) ON DUPLICATE KEY UPDATE `terminID` = LAST_INSERT_ID(`terminID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';", [event, start, end, room, unique], callback);
    }
}
module.exports = Termin