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
                    

                    DB_Semester.getID(name,function(err, dbResult){
                        if (err){
                            log.error("parse_Semester.js DB_Semester.getID", err);
                            console.log(err)
                        }else{
                            console.log(dbResult[1][0].ID);
                            if (index_result.length - 1 == index){
                                console.log("SEMESTER Completion called");
                                callback();
                            }
                        }
                    })
                       console.log("Completion called");
                });
            }
        })
    }
}

module.exports = Parse;