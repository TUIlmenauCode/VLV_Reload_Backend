const db = require("../../dbConnection");

// 

const parse_index = {
    write:function(linkText, link, isCourseLink, callback){
        return db.query("INSERT INTO `parse_index` (`parseIndexID`, `linkText`, `href`, `isCourseLink`, `created`, `updated`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [linkText,link, isCourseLink], callback);
    },

    exist_HREF:function(href, callback){
        return db.query("SELECT parseIndexID as selectedID FROM `parse_index` WHERE href = \"" + href + "\"", callback);
    },

    selectAll_href:function(callback){
        return db.query("SELECT `href` FROM `parse_index` WHERE 1", callback);
    },

    selectAll_CourseRows:function(callback){
        return db.query("SELECT * FROM `parse_index` WHERE isCourseLink = 0", callback);
    },

    selectAll_SemesterRows:function(callback){
        return db.query("SELECT * FROM `parse_index` WHERE isCourseLink = 1", callback);
    },

    setSelected:function(rowID, callback){
        return db.query("UPDATE `parse_index` SET `lastLookup`= CURRENT_TIMESTAMP() WHERE parseIndexID = ?", rowID, callback);
    }

    
}

module.exports = parse_index;