const db = require("../../dbConnection");

const Meals = {

    insert:function(mealId, mensa, name, output, price_student, price_employees, price, notes, date, callback){
       return db.query("INSERT INTO `meals` (`mealId`, `mensa`, `name`, `output`, `price_student`, `price_employees`, `price`, `notes`, `date`, `created`, `updated`, `lastLookup`, `uniqueData`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)",[mealId, mensa, name, output, price_student, price_employees, price, notes, date, date+ "-"+ mealId], callback)
    }
}

module.exports = Meals;