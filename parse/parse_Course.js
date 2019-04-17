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
                    console.log("SG kurz : " + sgKurz);
                    if (sgKurz.match(DP_patter)){ // is it Diplom Course ? 
                        console.log("--> is Diplom");
                        degree = 3;
                    }else if (sgKurz.match(MA_patter)){ // is it Master Course ? 
                        console.log("--> is Master");
                        degree = 2;
                    }

                    console.log(index_result.length)
                    
                    // existiert der Eintrag in der DB ? 

                    DB_Course.getID(name, short, degree, function(err, dbResult){
                        if (err){
                            log.error("parse_Course.js DB_Course.getID", err);
                            console.log(err)
                        }else{
                            console.log(dbResult[1][0].ID);
                            if (index_result.length - 1 == index){
                                console.log("COURSE Completion called");
                                callback();
                            }
                        }
                    })
                });
            }
        })
    }
}

module.exports = Parse;