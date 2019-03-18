const DB_parse_index = require("../modules/DB_Modules/parsed_index");
const DB_Course = require("../modules/DB_Modules/Course");
const utility = require("../modules/utility");
const log = require("../modules/Log");

const Parse = {
    start:function(callback){
        var DP_patter = /_DP+/g;
        var MA_patter = /_MA+/g;


        DB_parse_index.selectAll_CourseRows(function(err, index_result){
            if (err){
                log.error("Error called at parse_Index.request", error);
                console.log(error);
            }else{
                
                index_result.forEach(function(element, index) {
                    var name  = element.linkText;
                    var degree = 1;  // TODO : Abhänging von der Datenbank machen 1: Bachelor, 2: Master, 3: Diplom
                    const sgKurz = utility.getParameterByName("sgkurz", element.href)
                    var short = sgKurz;
                    console.log(sgKurz);
                    if (sgKurz.match(DP_patter)){ // is it Diplom Course ? 
                        console.log("--> is Diplom");
                        degree = 3;
                    }else if (sgKurz.match(MA_patter)){ // is it Master Course ? 
                        console.log("--> is Master");
                        degree = 2;
                    }

                    console.log(index_result.length)
                    
                    // existiert der Eintrag in der DB ? 

                    DB_Course.exist_NameShortDegree(name, short, degree, function(error, existResult){
                        if (error){
                            log.error("Error called parse_Course.exist_NameShortDegree", error);
                            callback(error, index_result)
                        }else{
                            if(typeof existResult[0] == "undefined"){
                                console.log("insert Data")
                                DB_Course.write(name, short, degree, function(err, result){
                                    if (err){
                                        log.error("Error called parse_Course.DB_Course.write", err);
                                        console.log("Error called parse_Course.DB_Course.write");
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
                                console.log("Row found: "+ existResult[0].courseID);
                                DB_Course.setSelected(existResult[0].courseID, function(set_error,set_result){
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