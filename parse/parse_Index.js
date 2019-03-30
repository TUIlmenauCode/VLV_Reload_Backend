const cheerio = require('cheerio');
var request = require("request");
const log = require('../modules/Log')
const DB_parse_index = require("../modules/DB_Modules/parsed_index");
const test_handler = require("../modules/parse_index_handler");

const api_log = require("../modules/API_Log");

const parse = {

    start:function(URL, callback){
        console.log("Start Parsing Index");
        request({
            uri: URL,
            }, 
            function(error, response, body) {
                if (error){
                    log.error("Error called at getIndex.request", error);
                    console.log(error);
                }else{
                    log.loadedPage("Course Index Page", URL, body);
                    $ = cheerio.load(body);
                    links = $('table a'); //get all hyperlinks
                    
                    //console.log(links.length);
                    
                    $(links).each(function(i, link){
                        console.log(links.length + " : " + i);
                        const pattern = /index.php\?+/g // pattern for next Links (aussortieren von Legende Link)
                        if ($(link).attr('href').match(pattern)){
                            var isFS = false;
                            const link_href =  $(link).attr('href');
                            const link_text =  $(link).text();
                            const isFSPattern = /[1-9].FS/g // isFS ? (or Course Link)
                            if ($(link).text().match(isFSPattern)){
                              isFS = true;
                            }

                            console.log("Link: " + link_href + "\n Text: "+ link_text + "\n isFS?: " + isFS);

                            
                            // Insert in DB Or Exist -> get Id 

                            DB_parse_index.getID(link_text, link_href, isFS, function(err, dbResult){
                                
                                if (err){
                                    log.error("Error called at getIndex.DB_parse_index.exist_HREF", error);
                                    console.log(err); 
                                }else{
                                    console.log(dbResult[1][0].ID);
                                    if (links.length - 1 == i){
                                        console.log("parse index ended");
                                        callback();
                                    }
                                }
                            })
                        }
                });
            }
        }); 
    }
}

module.exports = parse;