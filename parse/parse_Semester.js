const DB_parse_index = require("../modules/DB_Modules/parsed_index");
const DB_Semester = require("../modules/DB_Modules/Semester");
const utility = require("../modules/utility");
const log = require("../modules/Log");

const Parse = {
    start:function(callback){
        console.log("--> Start parsing Semester");
        DB_parse_index.selectAll_SemesterRows(function(err, index_result){
            if (err){
                log.error("Error called at parse_Index.request", error);
                console.log(error);
            }else{
                console.log(index_result);
                index_result.forEach(function(element, index) {
                    var name  = element.linkText;
                    console.log(name);

                   

                    DB_Semester.exist_Name(name, function(error, existResult){
                        if (error){
                            log.error("Error called parse_Course.exist_NameShortDegree", error);
                            callback(error, index_result)
                        }else{
                            console.log(existResult);
                            if(typeof existResult[0] == "undefined"){
                                console.log("insert Data")
                                DB_Semester.write(name, function(err, result){
                                    if (err){
                                        log.error("Error called parse_Course.DB_Course.write", err);
                                        console.log("Error called parse_Course.DB_Course.write");
                                        console.log(err);
                                    }else{
                                        console.log("Console : Insert row = " + result.insertId);

                                        if (index_result.length - 1 == index){
                                            console.log("Completion called");
                                            callback();
                                        }

                                    } 
                                });
                            }
                            else{
                                console.log("Row found: "+ existResult[0].fachSemesterID);
                                DB_Semester.setSelected(existResult[0].fachSemesterID, function(set_error,set_result){
                                    if(set_error){
                                        log.error("Error called parse_Course.DB_Course.setSelected", set_error);
                                        console.log("Error called parse_Course.DB_Course.setSelected");
                                        console.log(set_error);
                                    }else{
                                        console.log(set_result);
                                        if (index_result.length - 1 == index){
                                            console.log("Completion called");
                                            callback();
                                        }
                                    }
                                });
                            }
                        }
                    })
                });
            }
        })
    }
}

module.exports = Parse;