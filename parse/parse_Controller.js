const parseIndex =  require("../parse/parse_Index");
const parse_Course = require("./parse_Course");
const parse_Smester = require("../parse/parse_Semester");
const parse_SemenarGroups = require("../parse/parse_SeminarGroups");


const startURL = "https://www.tu-ilmenau.de/vlv/index.php?id=6"; // SS = 6 WS = 330

const Parse = {


    start:function(){
        // do Index 
        // Select all SeminarGroups Links on vlv reload website
        
        
        parseIndex.start(startURL, function(){

            console.log("Parse Controller Ended")
           
            // do course (Studiengänge)
            // parse_Course.start(function(){
                
            //     parse_Smester.start(function(){
                    
            //         parse_SemenarGroups.start(function(){
            //             console.log("END");
            //         })

            //     })
                
            // });

        });
    }
} 

module.exports = Parse;