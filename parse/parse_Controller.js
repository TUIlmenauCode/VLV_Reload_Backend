const parseIndex =  require("../parse/parse_Index");
const parse_Course = require("./parse_Course");
const parse_Semester = require("../parse/parse_Semester");
const parse_SeminarGroups = require("../parse/parse_SeminarGroups");
const parse_Events = require("../parse/parse_Events")
const parse_EventObjects = require("../modules/EventObject_handler");


const startURL = "https://www.tu-ilmenau.de/vlv/index.php?id=6"; // SS = 6 WS = 330

const Parse = {


    start:function(callback){
        // do Index 
        // Select all SeminarGroups Links on vlv reload website
        
        
        parseIndex.start(startURL, function(){
            
            // do course (Studiengänge)
            parse_Course.start(function(){

                //fetch Semester
                parse_Semester.start(function(){

                    // fetch 
                    parse_SeminarGroups.start(function(){

                        // get events
                        parse_Events.start(function(){
                            console.log("Parse Controller Ended");

                            //parse_EventObjects.fire();
                        })
                        
                    })
                    
                })

                
            })

            
            
           
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