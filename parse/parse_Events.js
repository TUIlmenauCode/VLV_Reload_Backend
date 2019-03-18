const log = require("../modules/Log");
const utility = require("../modules/utility");

const DBSeminarGroups = require("../modules/DB_Modules/SeminarGroup");
const parse_week = require("../parse/parseCalWeekView");




const Events = {

    start:function(callback){

        // orginal URL fom DB: index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS
        // minimum require :   


        DBSeminarGroups.selectAll_names_ID(function(select_err, select_result){
            if (select_err){
                log.error("Error called at parse_Events.start.DBSeminarGroups.selectAll_names_ID", select_err);
                console.log(select_err);
            }else{
                //console.log(select_result);

                select_result.forEach(function(DB_item, index){

                    //console.log("ID: " + DB_item.seminarGroupID);
                    //console.log("name: " + DB_item.name);

                    for (week = 14; week <=40 ; week++) {
                        const requestURL =  "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche="+week+"&sggruppe="+DB_item.name.replace(/ /g, "+")+"&vers=graph"
                        //console.log(requestURL);

                        parse_week.start(requestURL, DB_item.seminarGroupID, week, function(result){
                            
                            console.log(DB_item.name);
                            console.log(requestURL);
                            console.log(result);
                            console.log("==================================================================================")
                        })

                    }
                });
            }
        })






    }


}

module.exports = Events;


// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=24&sggruppe=BT_MA+1.FS+5+EleT&vers=graph
// https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche=14&sggruppe=BT_MA+1.FS+5+EleT&vers=graph