const {Dog,Temperament} = require('../../db');
const axios=require('axios');

async function PostDogs(name,image,height,weight,life_span,temperaments){
    if (image==="") image='./perro.jpg'
let creado = await Dog.create({name,image,height,weight,life_span})
console.log(name)
//temperamentArray=temperaments.split(', ')
await creado.addTemperament(temperaments)
return !!creado.id    

}
module.exports=PostDogs;