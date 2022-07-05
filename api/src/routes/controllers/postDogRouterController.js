const {Dog,Temperament} = require('../../db');
const axios=require('axios');

async function PostDogs(name,image,height,weight,life_span,temperaments){
let creado = await Dog.create({name,image,height,weight,life_span})
console.log(name)
temperamentArray=temperaments.split(', ')
await creado.addTemperament(temperamentArray)
return !!creado.id    

}
module.exports=PostDogs;