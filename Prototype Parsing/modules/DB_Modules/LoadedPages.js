const db = require("../../dbConnection");


const Load = {
    write:function(name, url, content, callback){
        return db.query("INSERT INTO `LoadedPages` (`loadedPagesID`, `name`, `URL`, `content`, `created`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)", [name, url, content], callback);
    }
}

module.exports = Load;