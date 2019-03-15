const cheerio = require('cheerio');
var request = require("request");
const log = require('../modules/Log')
const DB_parse_index = require("../modules/DB_Modules/parsed_index"); // URL Resource 
const utility = require("../modules/utility")

const URL = "https://www.tu-ilmenau.de/vlv/index.php?id=6&funccall=1&sgkurz=MB_DP&vers=text&studiengang=Maschinenbau&fs=2.FS" // SS = 6 WS = 330



const parse = {
    start:function(URL){
        request({
            uri: URL,
          }, function(error, response, body) {
              if (error){
                  log.error("Error called at parse_Index.request", error);
                  console.log(error);
              }else{
                  log.loadedPage("Course Index Page", URL, body);
                  $ = cheerio.load(body);
                  $('select[name="sggruppe"]').children().each(function() {
                    var value = $(this).val();
                    var text = $(this).text();

                    

                    

                    console.log(value + "\n");
                    console.log(text);
                    console.log("============");
                  });
              }
          });
    }
}


module.exports = parse;

