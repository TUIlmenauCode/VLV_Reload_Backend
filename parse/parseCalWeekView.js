/**
 * VLV RELoad GEMINI 2019
 * Kai Gothe
 */


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




const urlEnding = "&datum=&woche=15&anzeigen=anzeigen&vers=graph"
const testURL = "index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS";
const URLbase = "https://tu-ilmenau.de/vlv/"

const cheerio = require('cheerio');
var request = require("request");

const DB_loadedPages = require("../modules/DB_Modules/LoadedPages");
const EventHandler = require("../modules/EventType_handler");




  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var Parse = {
    start:function(url, seminarGroupID, week, callback){ 
        request({
            uri: url,
            
            }, 
            function(error, response, body) {
                if (error){
                    console.log(error);
                }else{
                    DB_loadedPages.write("WeekView", url, body);
                    const $ = cheerio.load(body);
                    var elements = $('td div'); //jquery get all hyperlinks
                    elements.each(function(i, e){
                        //console.log("["+i+"]======================================================"); 
                        var elementHTML = $(e).html()
                        const $e = cheerio.load(elementHTML);
                        //console.log(elementHTML);
                        

                        // Name der veranstaltung
                        //console.log($e("a").text());
                        var cur_Title = $e("a").text();
                        
                        // Prof
                        //console.log($e("span[style='font-color:#0000ff']").text())
                        var cur_Prof = $e("span[style='font-color:#0000ff']").text();

                        // Link zu veranstaltung
                        //console.log($e("a").attr('href'));
                        var cur_Link = $e("a").attr('href');
                        
                        // Veranstaltungs ID
                        //console.log(getParameterByName('fid', $e("a").attr('href')));
                        var cur_OldID = getParameterByName('fid', $e("a").attr('href'));
            
                        // Veranstaltungstyp
                        //console.log($e("span").after('code:').text());
                        var content  = $(e).clone().children().remove().end().text();
                        var reg      = content.replace(/code:([^xyz]+)/, '');
                        reg = reg.split("\n").filter(function(e){ return e != '' });;
                        //console.log(reg[0]);
                        var cur_Type = reg[0];
                        
                        // Wochen 
                        //console.log(reg[1]);
                        var cur_Week = reg[1];
                    
                        // raum 
                        //console.log( $e('.emBold').contents().first().text());
                        var cur_Room = $e('.emBold').contents().first().text();
                        
                        // Tag 
                        //console.log( $e('.emBold').eq(1).contents().first().text());
                        var cur_Day = $e('.emBold').eq(1).contents().first().text();

                        // Zeit
                        //console.log( $e('.emBold').eq(1).contents().text().replace($e('.emBold').eq(1).contents().first().text(), ""));
                        var cur_time = $e('.emBold').eq(1).contents().text().replace($e('.emBold').eq(1).contents().first().text(), "");
                        
                        var returnElement = {
                            title : cur_Title,
                            link: cur_Link,
                            oldID : cur_OldID,
                            type : cur_Type,
                            prof: cur_Prof,
                            weeks : cur_Week,
                            room: cur_Room,
                            day: cur_Day,
                            time: cur_time
                        }
                        
                        //returnList.push(returnElement);
                        EventHandler.start(returnElement, seminarGroupID, week)


                        // if (elements.length == i){
                        //     callback(returnList);
                        // }

                    });
                    
              }
          });
    }
}

module.exports = Parse