# VLV_Reload_Backend
Backend Service for VLV Reload

ON DUPLICATE KEY UPDATE `courseID` = LAST_INSERT_ID(`courseID`), `lastLookup` = CURRENT_TIMESTAMP();SELECT LAST_INSERT_ID() AS 'ID';


{ title: 'Advanced Mobile Communication Networks (eng.)',
  link: 'http://wcms3.rz.tu-ilmenau.de/%7Egoettlich/elvvi/sommer/list/fachseite.php?fid=CD8D4215803AFD05201AB312EC6A5961',
  oldID: 'CD8D4215803AFD05201AB312EC6A5961',
  type: 'Vorlesung',
  prof: 'Prof. Mitschele-Thiel, Fak. IA',
  weeks: '14.- 22. KW',
  room: 'Sr HU 211/212',
  day: 'Dienstag',
  time: '11.00 - 12.30',
  seminarGroupID: 171,
  week: 14 }
