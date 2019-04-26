var request = require("request");
var moment = require('moment');
const meal_DB = require('../modules/DB_Modules/DB_Meals');


var mensaId = [837,150,846,149];
var days = [];

days.push(moment().format('YYYY-MM-DD'));


for (i = 1; i < 14; i++) {
    days.push(moment().add(i, "days").format('YYYY-MM-DD'));
}

days.forEach(function(d){

    mensaId.forEach(function(m){

        console.log("https://openmensa.org/api/v2/canteens/"+m+"/days/"+d+"/meals");

        request({
            uri: "https://openmensa.org/api/v2/canteens/"+m+"/days/"+d+"/meals",
            }, 
            function(error, response, body) {
                if (error){
                    console.log(error)
                }else{
                    var jsonString=body.replace(/\n/g, " ")
                    if (jsonString.length > 0){
                        const data =JSON.parse(body);

                        data.forEach(function(e){
                            console.log(e.prices.students);
                            meal_DB.insert(e.id, m, e.name, e.category, e.prices.students, e.prices.employees, e.prices.others, JSON.stringify(e.notes), d, function(err, dbResult){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log(dbResult);
                                }
                            })
                        })

                    }else{
                        console.log("##############\n# Empty #\n##############");
                    }
                    //
                    //console.log(JSON.parse("\"" + body + "\""));
                }
            })
    })

})

/**
 * EXample Resonse Object 
 * 
 * { id: 4151704,
    name: 'mensaInternational-Russland: Geschmorte Weißkrautpfanne mit Schweinefleisch und Kartoffeln',
    category: 'Mittag Ausgabe A',
    prices: { students: 1.85, employees: 3.75, pupils: null, others: 5.15 },
    notes: [ 'Schweinefleisch', 'Knoblauch' ] },
  { id: 4151705,
    name: 'Bio-Spirelli mit Bolognesesoße und Reibekäse',
    category: 'Mittag Ausgabe B',
    prices: { students: 1.85, employees: 3.75, pupils: null, others: 5.15 },
    notes: 
     [ 'enthält Weizen',
       'enthält Sellerie',
       'Rindfleisch',
       'enthält Milch- und Milchzucker',
       'Knoblauch' ] }
 */