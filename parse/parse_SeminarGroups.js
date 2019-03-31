const cheerio = require('cheerio');
var request = require("request");
const log = require('../modules/Log');
const DB_Course = require("../modules/DB_Modules/Course");
const DB_Semster = require("../modules/DB_Modules/Semester");
const DB_parse_index = require("../modules/DB_Modules/parsed_index"); // URL Resource 
const DB_Seminargroup = require("../modules/DB_Modules/SeminarGroup")
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
                                //console.log(course_result);
                                const course_ID = course_result[0].courseID;
                                console.log("CourseID : " + course_ID);
                                DB_Semster.getID_fromName(fs_name, function(semester_error, semster_result){
                                    if(semester_error){
                                        log.error("Error called at parse_SeminarGroups.start.DB_Semster.getID_fromName", semester_error);
                                        console.log(semester_error);
                                        callback(semester_error, null);
                                    }else{
                                        const fachSemesterID = semster_result[0].fachSemesterID;
                                        console.log("Fachsemester : " + fachSemesterID);

                                        
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
                                                            
                                                        DB_Seminargroup.getID(value,course_ID, fachSemesterID, function(err, dbResult){
                                                            if (err){
                                                                log.error("parse_SeminarGroup.js DB_Seminargroup.getID", err);
                                                                console.log(err)
                                                            }else{
                                                                console.log(dbResult[1][0].ID);
                                                                if (index_result.length - 1 == index){
                                                                    console.log("SEMESTER Completion called");
                                                                    callback();
                                                                }
                                                            }
                                                        })
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

