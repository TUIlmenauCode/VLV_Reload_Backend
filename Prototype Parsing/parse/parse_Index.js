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
                        //console.log(links.length + " : " + i);
                        const pattern = /index.php\?+/g // pattern for next Links (aussortieren von Legende Link)
                        if ($(link).attr('href').match(pattern)){
                            var isFS = false;
                            const link_href =  $(link).attr('href');
                            const link_text =  $(link).text();
                            const isFSPattern = /[1-9].FS/g // isFS ? (or Course Link)
                            if ($(link).text().match(isFSPattern)){
                              isFS = true;
                            }
                            

                            test_handler.exist_Row_withHREF(link_href, function(err, result){
                                if (err){
                                    log.error("Error called at getIndex.DB_parse_index.exist_HREF", error);
                                    console.log(err);
                                }else{
                                    //console.log("Result:" );
                                    //console.log(result);
                                    if (result[0] == null){
                                        //console.log("--> Index object does not exist -> insert in DB");
                                        DB_parse_index.write(link_text, link_href, isFS, function(err, result){
                                            if (err){
                                                log.error("Error called at getIndex.DB_parse_index.write", err);
                                                console.log(err);
                                            }else{
                                               // console.log(result.insertId);
                                            }
                                        });
                                    }else{
                                        //console.log("--> Index object does exist");
                                        //console.log(result[0].selectedID);
                                    }
                                }
                            })

                        if (links.length - 1 == i){
                            console.log("parse index ended");
                            callback();
                        }
                    }
                });
            }
        }); 
    }
}

module.exports = parse;