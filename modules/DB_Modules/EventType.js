const db = require("../../dbConnection");

const EventType = {

    write:function(name, callback){
        return db.query("INSERT INTO `EventType` (`eventTypeID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)", [name], callback)
    },

    get_ID_from_name(name, callback){
        return db.query("SELECT `eventTypeID` FROM `EventType` WHERE `name` = ?", [name], callback);
    },

    setSelected:function(rowID, callback){
        return db.query("UPDATE `EventType` SET `lastLookup`= CURRENT_TIMESTAMP() WHERE eventTypeID = ?", rowID, callback);
    },

    test:function(name, callback){
        return db.query("INSERT INTO `EventType` (name) VALUES (?) ON DUPLICATE key update `lastLookup` = CURRENT_TIMESTAMP()", [name], callback)
    },

    start:function(name, callback){
        return db.query("INSERT IGNORE INTO `EventType` (name) VALUES (?); SELECT eventTypeID as insertId FROM `EventType` WHERE name = ?;", [name, name], callback);
    },

    getID:function(name, callback){
        return db.query("INSERT INTO `EventType` (`eventTypeID`, `name`, `created`, `updated`, `lastLookup`) VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) ON DUPLICATE KEY UPDATE `eventTypeID` = LAST_INSERT_ID(`eventTypeID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';",[name], callback)
    }
    

}

module.exports = EventType