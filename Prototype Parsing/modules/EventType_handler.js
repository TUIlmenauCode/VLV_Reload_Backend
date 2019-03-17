const log = require("./Log");
var moment = require('moment');

const DB_EventType = require("./DB_Modules/EventType");
const DB_Prof = require("./DB_Modules/Prof");
const DB_Event = require("./DB_Modules/Event");
const DB_Room = require("./DB_Modules/Room");
const DB_Termin = require("./DB_Modules/Termin");
const DB_TerminGroup = require("./DB_Modules/GroupTermins");

/**
  * Sample Return Object
  { title: 'Quantitative Unternehmensplanung 2',
    link: 'http://wcms3.rz.tu-ilmenau.de/%7Egoettlich/elvvi/sommer/list/fachseite.php?fid=963CBD3F117811D9F0143C46665AE6D0',
    oldID: '963CBD3F117811D9F0143C46665AE6D0',
    type: 'Vorlesung',
    prof: 'Prof. Bankhofer, Fak. WM',
    weeks: '14.- 28. KW',
    room: 'HU-Hs',
    day: 'Dienstag',
    time: '11.00 - 12.30' }
  */


const Handler = {


    start:function(resultObject, seminarGroupID, week){
        DB_EventType.start(resultObject.type, function(err, res){
            
            if (err){
                console.log("ERROR CALLED");
                console.log(err);
            }else{
                var current_eventType = res[1][0].insertId;
                console.log("EventType InsertId: " + current_eventType);
                if (current_eventType){
                    DB_Prof.start(resultObject.prof, function(prof_error, prof_result){
                        if (err){
                            console.log("ERROR CALLED");
                            console.log(prof_error);
                        }else{
                            //console.log(prof_result);
                            var current_prof = prof_result[1][0].insertId;
                            console.log("PROF InsertId: " + current_prof);
                            if (current_prof) {
                                DB_Event.start(resultObject.title, resultObject.link, resultObject.oldID, current_prof, current_eventType, function(event_error, event_result){
                                    if(event_error){
                                        console.log("ERROR CALLED");
                                        console.log(event_error);
                                    }else{
                                        //console.log(event_result);
                                        var current_event = event_result[1][0].insertId;
                                        console.log("Event InsertId: " + current_event);
                                        if (current_event){
                                            DB_Room.start(resultObject.room, function(room_error, room_result){
                                                if(room_error){
                                                    console.log("ERROR CALLED");
                                                    console.log(room_error);
                                                }else{
                                                    current_room = room_result[1][0].insertId;
                                                    console.log("Room InsertId: " + current_event);
                                                    if (current_room){
                                                        
                                                        var times = resultObject.time.split(" - ");
                                                        console.log(times);
                                                        var start_time = moment(times[0], 'HH.mm').locale("de").day(resultObject.day).week(week).year(2019).format("YYYY-MM-DD HH:mm:ss");
                                                        var end_time = moment(times[1], 'HH.mm').locale("de").day(resultObject.day).week(week).year(2019).format("YYYY-MM-DD HH:mm:ss");
                                                        
                                                        console.log(start_time);
                                                        console.log(end_time);

                                                        DB_Termin.start(current_event, start_time, end_time, current_room, current_event+start_time, function(termin_error, termin_result){
                                                            if(termin_error){
                                                                console.log("ERROR CALLED");
                                                                console.log(termin_error);
                                                            }else{
                                                                console.log("Termin Result");
                                                                console.log(termin_result);
                                                                var current_Termin = termin_result[1][0].insertId;
                                                                if (current_Termin){
                                                                    DB_TerminGroup.start(current_Termin, seminarGroupID, current_Termin + "-" + seminarGroupID, function(stermin_error, stermin_result){
                                                                        if (stermin_error){
                                                                            console.log("ERROR sTERMIN");
                                                                            console.log(stermin_error);
                                                                        }else{
                                                                            console.log("-> RESULT sTERMIN");
                                                                            console.log(stermin_result);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }


    


    // [X] handle EventType -> get id

    // [x] handle Prof -> get id

    // [x] handle Event -> get id 

    // [x] handle Room -> get id

    // handle Termin -> get id 

    // handle Group Termin



}


module.exports = Handler;