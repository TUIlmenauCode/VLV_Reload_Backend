const parseIndex =  require("../parse/parse_Index");
const parse_Course = require("./parse_Course");
const parse_Smester = require("../parse/parse_Semester");
const parse_SemenarGroups = require("../parse/parse_SeminarGroups");


const startURL = "https://www.tu-ilmenau.de/vlv/index.php?id=6"; // SS = 6 WS = 330

const Parse = {


    start:function(){
        // do Index 

        parseIndex.start(startURL, function(){
           
            // do course (Studiengänge)
            parse_Course.start(function(){
                
                parse_Smester.start(function(){
                    
                    parse_SemenarGroups.start(function(){
                        console.log("END");
                    })

                })
                
            });

        });


        

        // do Semester 

        // do Seminargroups 

        // do WEEk cal 

            // do veranstalltungen
            // do  termine 

            // do rooms 


        // SELECT * FROM parse_index WHERE DATE(`lastLookup`) != CURDATE()

    }


} 

module.exports = Parse;