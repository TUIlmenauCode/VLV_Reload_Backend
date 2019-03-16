const DB_seminarGroup = require("./DB_Modules/SeminarGroup");



const handler = {

    // Exist , if not -> insert!
    exist:function(name, courseID, semesterID, callback){
        DB_seminarGroup.exist_Name(name, function(exist_err, exist_result){
            if (exist_err){
                log.error("Error called parse_index_handler.exist_Row_withHREF", error);
                console.log(exist_err);
                callback(exist_err, null);
            }else{
                console.log(exist_result);
                if(typeof exist_result[0] == "undefined"){
                    console.log("insert Data");
                    DB_seminarGroup.write(name, courseID, semesterID, function(err, result){
                        if (err){
                            log.error("Error called parse_Course.DB_Course.write", err);
                            console.log("Error called parse_Course.DB_Course.write");
                            callback(err, null);
                        }else{
                            console.log("Console : Insert row = " + result.insertId);
                            callback(null,result);
                        } 
                    });
                }
                else{
                    console.log("Row found: "+ exist_result[0].seminarGroupID);
                    DB_seminarGroup.setSelected(exist_result[0].seminarGroupID, function(set_error,set_result){
                        if(set_error){
                            log.error("Error called parse_Course.DB_Course.setSelected", set_error);
                            console.log("Error called parse_Course.DB_Course.setSelected");
                            console.log(set_error);
                            callback(set_error, null);
                        }else{
                            console.log(set_result);
                            callback(null, set_result);
                        }
                    });
                }
            }
        });
    },

    // select_via_id:function(id){

    // },

    // select_via_name:function(name){

    // }



}

module.exports = handler;