const log = require("../modules/Log");
const utility = require("../modules/utility");

const DBSeminarGroups = require("../modules/DB_Modules/SeminarGroup");
const parese_week = require("../parse/parseCalWeekView");




const Events = {

    start:function(callback){

        // orginal URL fom DB: index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS
        // minimum require :   


        DBSeminarGroups.selectAll_names_ID(function(select_err, select_result){
            if (select_err){
                log.error("Error called at parse_Events.start.DBSeminarGroups.selectAll_names_ID", select_err);
                console.log(select_err);
            }else{
                console.log(select_result);

                select_result.forEach(function(DB_item, index){

                    console.log("ID: " + DB_item.seminarGroupID);
                    console.log("name: " + DB_item.name);

                    for (week = 14; week <=40 ; week++) {
                        const requestURL =  "http://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&woche="+week+"&sggruppe="+DB_item.name.replace(" ", "+")+"&vers=graph"
                        console.log(requestURL);

                        parese_week.start(requestURL, function(result){
                            console.log(DB_item.name);
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