const pagelog = require("./DB_Modules/LoadedPages");
const systemLog = require("./API_Log");

const Log = {
    loadedPage:function(name, url , content){
        pagelog.write(name, url, content, function(err, result){
            if(err){
                systemLog.error("Error called at Log.loadedPage");
                systemLog.error(err);
            }else{
                console.log("loaded Page insert (lastInsertID):" + result.insertId);
            }
        })
    }, 

    error:function(locationString, err){
        systemLog.error(locationString);
        systemLog.error(err);
    }
}

module.exports = Log;