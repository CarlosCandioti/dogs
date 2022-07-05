const {Temperament} = require('../../db');
async function getTemperamentsFromDB(){
let temps= await Temperament.findAll();
return temps
}

module.exports=getTemperamentsFromDB;