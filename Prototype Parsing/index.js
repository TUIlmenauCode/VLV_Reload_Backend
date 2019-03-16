const parseCalWeekView = require("./parse/parseCalWeekView");
const parseIndex = require("./parse/parse_Index");
const parse_seminargruppe = require("./parse/parse_SeminarGroups");

const parse_Controller = require("./parse/parse_Controller");

const urlEnding = "&datum=&woche=15&anzeigen=anzeigen&vers=graph"
const testURL = "index.php?id=6&funccall=1&sgkurz=WIW-MB_MA&vers=text&studiengang=Wirtschaftsingenieurwesen+-+Maschinenbau&fs=2.FS";
const URLbase = "https://tu-ilmenau.de/vlv/"



// parseCalWeekView.start(URLbase + testURL + urlEnding, function(result){
//     console.log(result);
// });
var URL = "";
URL = "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&sgkurz=MB_DP&vers=text&studiengang=Maschinenbau&fs=2.FS" // SS = 6 WS = 330

//parse_Controller.start(URL);

parse_seminargruppe.start(function(){
    console.log("END Test");
})

