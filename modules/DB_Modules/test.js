const db = require("../../dbConnection")

const Test = {

    fire:function(resultObject, callback){

        return db.query("SET @i_title = ?;\
        SET @i_link = ?;\
        SET @i_oldID = ?;\
        SET @i_type = ?;\
        SET @i_prof = ?;\
        SET @i_room = ?;\
        \
        SET @i_start = ?;\
        SET @i_end = ?;\
        SET @i_seminarGroup = ?;\
        \
        INSERT INTO `Prof` (name) \
        VALUES (@i_prof) \
        ON DUPLICATE KEY \
        UPDATE `profID` = LAST_INSERT_ID(`profID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT @profID := LAST_INSERT_ID();\
        \
        INSERT INTO `EventType` (`eventTypeID`, `name`, `created`, `updated`, `lastLookup`) \
        VALUES (NULL, @i_type, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) \
        ON DUPLICATE KEY \
        UPDATE `eventTypeID` = LAST_INSERT_ID(`eventTypeID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT @eventTypeID := LAST_INSERT_ID() AS 'ID';\
        \
        INSERT INTO `Event` (`eventID`, `title`, `description`, `link`, `originID`, `prof`, `eventType`, `created`, `updated`, `lastLookup`) \
        VALUES (NULL, @i_title, NULL, @i_link, @i_oldID, @profID, @eventTypeID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)\
        ON DUPLICATE KEY \
        UPDATE `eventID` = LAST_INSERT_ID(`eventID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT @eventID := LAST_INSERT_ID() AS 'ID';\
        \
        INSERT INTO `Room` (`roomID`, `name`, `created`, `updated`, `lastLookup`) \
        VALUES (NULL, @i_room, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) \
        ON DUPLICATE KEY \
        UPDATE `roomID` = LAST_INSERT_ID(`roomID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT @roomID := LAST_INSERT_ID() AS 'ID';\
        \
        INSERT INTO `Termin` (`terminID`, `event`, `start`, `end`, `room`, `created`, `updated`, `lastLookup`, `uniqueID`) \
        VALUES (NULL, @eventID, @i_start, @i_end, @roomID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, @eventID+@i_start+@roomID) \
        ON DUPLICATE KEY \
        UPDATE `terminID` = LAST_INSERT_ID(`terminID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT @terminID := LAST_INSERT_ID() AS 'ID';\
        \
        INSERT INTO `GroupTermins` (`groupTerminsID`, `termin`, `group`, `created`, `updated`, `lastLookup`, `uniqueData`) \
        VALUES (NULL, @terminID, @i_seminarGroup, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, @terminID+@i_seminarGroup) \
        ON DUPLICATE KEY \
        UPDATE `groupTerminsID` = LAST_INSERT_ID(`groupTerminsID`), `lastLookup` = CURRENT_TIMESTAMP();\
        SELECT LAST_INSERT_ID() AS 'ID';",[resultObject.title, resultObject.link, resultObject.oldID, resultObject.type, resultObject.prof, resultObject.room, resultObject.start, resultObject.end, resultObject.seminarGroupID], callback)

    }

}

module.exports = Test;