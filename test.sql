
SET @i_title = 'Advanced Mobile Communication Networks (eng.)';
SET @i_link = 'http://wcms3.rz.tu-ilmenau.de/%7Egoettlich/elvvi/sommer/list/fachseite.php?fid=CD8D4215803AFD05201AB312EC6A5961';
SET @i_oldID = 'CD8D4215803AFD05201AB312EC6A5961';
SET @i_type = 'Vorlesung';
SET @i_prof = 'Prof. Mitschele-Thiel, Fak. IA';
SET @i_weeks = '14.- 28. KW';
SET @i_room = 'Sr HU 211/212';

SET @i_start = '2019-04-02T11:00:00';
SET @i_end = '2019-04-02T12:30:00';
SET @i_seminarGroup = '171';



INSERT INTO `Prof` (name) 
VALUES (@i_prof) 
ON DUPLICATE KEY 
UPDATE `profID` = LAST_INSERT_ID(`profID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT @profID := LAST_INSERT_ID();


INSERT INTO `EventType` (`eventTypeID`, `name`, `created`, `updated`, `lastLookup`) 
VALUES (NULL, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) 
ON DUPLICATE KEY 
UPDATE `eventTypeID` = LAST_INSERT_ID(`eventTypeID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT @eventTypeID := LAST_INSERT_ID() AS 'ID';


INSERT INTO `Event` (`eventID`, `title`, `description`, `link`, `originID`, `prof`, `eventType`, `created`, `updated`, `lastLookup`) 
VALUES (NULL, @i_title, NULL, @i_link, @i_oldID, @profID, @eventTypeID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
ON DUPLICATE KEY 
UPDATE `eventID` = LAST_INSERT_ID(`eventID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT @eventID := LAST_INSERT_ID() AS 'ID';


INSERT `Room` (`roomID`, `name`, `created`, `updated`, `lastLookup`) 
VALUES (NULL, @i_room, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) 
ON DUPLICATE KEY 
UPDATE `roomID` = LAST_INSERT_ID(`roomID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT @roomID := LAST_INSERT_ID() AS 'ID';


INSERT INTO `Termin` (`terminID`, `event`, `start`, `end`, `room`, `created`, `updated`, `lastLookup`, `uniqueID`) 
VALUES (NULL, @eventID, @i_start, @i_end, @roomID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?) 
ON DUPLICATE KEY 
UPDATE `terminID` = LAST_INSERT_ID(`terminID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT @terminID := LAST_INSERT_ID() AS 'ID';


INSERT INTO `GroupTermins` (`groupTerminsID`, `termin`, `group`, `created`, `updated`, `lastLookup`, `uniqueData`) 
VALUES (NULL, @terminID, @i_seminarGroup, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, ?) 
ON DUPLICATE KEY 
UPDATE `groupTerminsID` = LAST_INSERT_ID(`groupTerminsID`), `lastLookup` = CURRENT_TIMESTAMP();
SELECT LAST_INSERT_ID() AS 'ID';
