const {Temperament} = require('../../db');
const axios=require('axios');

async function getTemperamentFromApi(){
    allDogs= await axios("https://api.thedogapi.com/v1/breeds");
    let setDogs= new Set();
    allDogs.data.map(dog=>{
    if (dog.temperament){    
    if (Array.isArray(dog.temperament.split(', '))){
        dog.temperament.split(', ').forEach(temperament => {
       setDogs.add(temperament)  
    })}else{
        setDogs.add(dog.temperament)
    }}});
      
    
  
let arrayDogs=Array.from(setDogs).map(temperament=>{return {name:temperament}})

let creado=await Temperament.bulkCreate(arrayDogs)
return !!creado.id
}
module.exports=getTemperamentFromApi;