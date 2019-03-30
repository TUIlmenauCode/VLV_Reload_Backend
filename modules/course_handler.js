const DB_course = require("./DB_Modules/Course")


const Course = {

    exist_row:function(name, short, degree, callback){
        DB_course.exist_NameShortDegree(name, short, degree, function(error, result){
            if (error){
                log.error("Error called parse_index_handler.exist_Row_withHREF", error);
                callback(error, result)
            }else{
                console.log(result);
            }
        })
    }

    // exist_Row_withHREF:function(href, callback){
    //     DB_module.exist_HREF(href, function(error, result){
    //         if (error){
    //             log.error("Error called parse_index_handler.exist_Row_withHREF", error);
    //             callback(error, result)
    //         }else{
    //             if (result.length){
    //                 DB_module.setSelected(result[0].selectedID, function(err, mySQLResult){
    //                     if (err){
    //                         log.error("Error called parse_index_handler.exist_Row_withHREF", err);
    //                         callback(error, result);
    //                     }else{
    //                         callback(error, result);
    //                     }
    //                 });
    //             }else{
    //                 callback(error, result);
    //             }
    //         }
    //     });

}

module.exports = Course