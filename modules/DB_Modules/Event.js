const db = require("../../dbConnection");


const Event = {
    start:function(title, link, originalID, prof, eventType, callback){
        return db.query("INSERT IGNORE INTO `Event` (`eventID`, `title`, `description`, `link`, `originID`, `prof`, `eventType`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL); SELECT eventID as insertId FROM `Event` WHERE link = ?;", [title, link, originalID, prof, eventType, link], callback)
    },

    getID:function(title, link, originalID, profID, eventTypeID, callback){
        return db.query("INSERT INTO `Event` (`eventID`, `title`, `description`, `link`, `originID`, `prof`, `eventType`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)ON DUPLICATE KEY UPDATE `eventID` = LAST_INSERT_ID(`eventID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';", [title, link, originalID, profID, eventTypeID], callback)
    }
}
module.exports = Event