const db = require("../../dbConnection");


const Event = {
    start:function(title, link, originalID, prof, eventType, callback){
        return db.query("INSERT IGNORE INTO `Event` (`eventID`, `title`, `description`, `link`, `originID`, `prof`, `eventType`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL); SELECT eventID as insertId FROM `Event` WHERE link = ?;", [title, link, originalID, prof, eventType, link], callback)
    }
}
module.exports = Event