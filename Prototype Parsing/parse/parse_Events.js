const log = require("../modules/Log");
const utility = require("../modules/utility");

const DBSeminarGroups = require("../modules/DB_Modules/SeminarGroup");




const Events = {

    start:function(callback){

        // orginal URL fom DB: index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS
        // minimum require :   index.php?id=6&funccall=1&woche=14&sggruppe=WIW-MB_MA+2.FS&vers=graph


        DBSeminarGroups.selectAll_names_ID(function(select_err, select_result){
            if (select_err){
                log
            }
        })






    }


}

module.exports = Events;