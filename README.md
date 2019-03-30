# VLV_Reload_Backend
Backend Service for VLV Reload

ON DUPLICATE KEY UPDATE `courseID` = LAST_INSERT_ID(`courseID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';
