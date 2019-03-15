const DB_module = require("./DB_Modules/parsed_index")
const log = require("./Log");


const parseIndex = {
    exist_Row_withHREF:function(href, callback){
        DB_module.exist_HREF(href, function(error, result){
            if (error){
                log.error("Error called parse_index_handler.exist_Row_withHREF", error);
                callback(error, result)
            }else{
                if (result.length){
                    DB_module.setSelected(result[0].selectedID, function(err, mySQLResult){
                        if (err){
                            log.error("Error called parse_index_handler.exist_Row_withHREF", err);
                            callback(error, result);
                        }else{
                            callback(error, result);
                        }
                    });
                }else{
                    callback(error, result);
                }
            }
        });
    },





}

module.exports = parseIndex;