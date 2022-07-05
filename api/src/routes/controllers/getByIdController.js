const axios=require('axios');

async function getDogByID(id){
let allDogs= await axios("http://localhost:3001/dogs")
let dogById
allDogs.data.map(dog=>{ if (dog.id.toString()===id){
    console.log(dog)
    dogById=dog}else{
    //throw new Error({message:"Perro no encontrado"})
}  })
return dogById
}
module.exports=getDogByID;