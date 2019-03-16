const cheerio = require('cheerio');
var request = require("request");
const log = require('../modules/Log');
const DB_Course = require("../modules/DB_Modules/Course");
const DB_Semster = require("../modules/DB_Modules/Semester");
const DB_parse_index = require("../modules/DB_Modules/parsed_index"); // URL Resource 
const utility = require("../modules/utility");
const Handler_SeminarGroup = require("../modules/seminarGroup_handler");

const URL = "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&sgkurz=MB_DP&vers=text&studiengang=Maschinenbau&fs=2.FS" // SS = 6 WS = 330


// TODO: proper Error Handling 


const parse = {

    start:function(callback){
        DB_parse_index.selectAll(function(index_err, index_result){
            if (index_err){
                log.error("Error called at parse_SeminarGroups.start.DB_parse_index.selectAll_href", index_err);
                console.log(index_err);
                callback(index_err, null);
            }else{
                index_result.forEach(function(index_element, index){
                    const course_name = utility.getParameterByName("sgkurz", index_element.href)
                    const fs_name = utility.getParameterByName("fs", index_element.href);

                    if (index_element.isCourseLink){

                        DB_Course.getID_fromName(course_name, function(course_err, course_result){
                            if(course_err){
                                log.error("Error called at parse_SeminarGroups.start.DB_Course.getID_fromName", course_err);
                                console.log(course_err);
                                callback(course_err, null);
                            }else{
                                //console.log("Course Result: " + course_name);
                                const course_ID = course_result[0].courseID;
                                //console.log(course_ID);
                                DB_Semster.getID_fromName(fs_name, function(semester_error, semster_result){
                                    if(semester_error){
                                        log.error("Error called at parse_SeminarGroups.start.DB_Semster.getID_fromName", semester_error);
                                        console.log(semester_error);
                                        callback(semester_error, null);
                                    }else{
                                        const fachSemesterID = semster_result[0].fachSemesterID;
                                        //console.log(fachSemesterID);

                                        
                                        request({
                                            uri: "https://tu-ilmenau.de/vlv/" + index_element.href,
                                          }, function(error, response, body) {
                                              if (error){
                                                  log.error("Error called at parse_SeminarGroup.request", error);
                                                  console.log(error);
                                                  callback(error, null);
                                              }else{
                                                  log.loadedPage("Course Index Page", URL, body);
                                                  $ = cheerio.load(body);
                                                  $('select[name="sggruppe"]').children().each(function() {
                                                    var value = $(this).val();
                                                    var text = $(this).text();

                                                    var gruppen_pattern = /Gruppen/g
                                                    if (text.match(gruppen_pattern)){
                                                    }else{
                                                        console.log("============");
                                                        console.log("Course: " + course_ID);
                                                        console.log("fachSemster: " + fachSemesterID);
                                                        console.log("name: " + value);
                                                        console.log("============");
                                                        Handler_SeminarGroup.exist(value, course_ID, fachSemesterID, function(handler_err, handler_result){
                                                            
                                                            if (index_result.length - 1 == index){
                                                                callback(handler_err, handler_result);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                })
            }
        })
    },
}


module.exports = parse;

