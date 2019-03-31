const log = require("../modules/Log");
const utility = require("../modules/utility");

const DBSeminarGroups = require("../modules/DB_Modules/SeminarGroup");
const parse_week = require("../parse/parseCalWeekView");




function parseWeek(week, SeminarGroup, timeOut){
    const requestURL =  "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche="+week+"&sggruppe="+SeminarGroup.replace(/ /g, "+")+"&vers=graph"
    
    setTimeout(function(){
            console.log("week " + week + " SG " + SeminarGroup.replace(/ /g, "+"))
            console.log("loop timeout: " + timeOut)
            parse_week.start(requestURL, SeminarGroup, week, function(result){
            
                console.log(DB_item.name);
                console.log(requestURL);
                console.log(result);
                console.log("==================================================================================")
            }, timeOut)

    }, )
}








const Events = {

    start:function(callback){

        // orginal URL fom DB: index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS
        // minimum require :   


        DBSeminarGroups.selectAll_names_ID(function(select_err, select_result){
            if (select_err){
                log.error("Error called at parse_Events.start.DBSeminarGroups.selectAll_names_ID", select_err);
                console.log(select_err);
            }else{
               

                var interval = 1 * 1000; // n seconds;
                var current_WEEK = 14;
                var i = 0;

                var timer = setInterval(function(){
                    
                    console.log("Time " + new Date().toISOString());
                    if (current_WEEK >= 14 && current_WEEK <= 40) {
                        console.log("--> start parse Timer : " + (i+1) * interval);
                        console.log("--> Item :" + i);
                        parseWeek(current_WEEK,select_result[i].seminarGroupID, i * interval)
                    }else{
                        console.log("--> Timer cleared");
                        clearInterval(timer);
                    }

                    current_WEEK = current_WEEK + 1;

                    i++;
                    
                }, interval)

            }
        })






    }


}

module.exports = Events;


// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=24&sggruppe=BT_MA+1.FS+5+EleT&vers=graph
// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=14&sggruppe=BT_MA+1.FS+5+EleT&vers=graph