const log = require("../modules/Log");
const utility = require("../modules/utility");

const DBSeminarGroups = require("../modules/DB_Modules/SeminarGroup");
const parse_week = require("../parse/parseCalWeekView");




function parseWeek(week, SeminarGroup, SeminarGroupID){
    console.log("week " + week + " SG " + SeminarGroup.replace(/ /g, "+"))
    const requestURL =  "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche="+week+"&sggruppe="+SeminarGroup.replace(/ /g, "+")+"&vers=graph"       
    parse_week.start(requestURL, SeminarGroupID, week, function(result){
    
        console.log(DB_item.name);
        console.log(requestURL);
        console.log(result);
        console.log("==================================================================================")
    
    })
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
               

                var interval = 300; // ms;
                var current_WEEK = 17;
                var i = 0;
                var count_SG    =  select_result.length;

                console.log("INTI \n======\n count:" + count_SG);

                var timer = setInterval(function(){
                    
                    console.log("LOOP BEGIN \n===========\n week: " + current_WEEK + "\n i: " + i);

                    if (current_WEEK >= 40){
                        current_WEEK = 17;
                        i++;
                        console.log("LOOP reset \n===========\n week: " + current_WEEK + "\n i: " + i);
                    }
                    
                    
                    if (i < count_SG) {
                        console.log(select_result[i]);
                        console.log("--> Item :" + i + " of " + count_SG);
                        parseWeek(current_WEEK,select_result[i].name, select_result[i].seminarGroupID)
                    }else{
                        console.log("-->  Loop END ");
                        //clearInterval(timer);
                    }

                    current_WEEK = current_WEEK + 1;

                }, interval)

            }
        })






    }


}

module.exports = Events;


// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=24&sggruppe=BT_MA+1.FS+5+EleT&vers=graph
// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=14&sggruppe=BT_MA+1.FS+5+EleT&vers=graph