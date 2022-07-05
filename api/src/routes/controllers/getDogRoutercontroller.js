const {Dog,Temperament} = require('../../db');
const axios=require('axios');
const {Op}=require('sequelize')

async function GetDogs(name){
let allDogs;
let filterAllDogs;
let filterAllDogsDB;
if (name){
name= name.toLowerCase();
allDogs= await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=84d26e3b-a7b0-4757-a8a8-4c0555bf8b64`)
filterAllDogs= allDogs.data;
let nameCapital= name.slice(0,1).toUpperCase()+name.slice(1);
let nameUpper= name.toUpperCase();
filterAllDogsDB=await Dog.findAll({
    where:{
        name:{
          [Op.or]:[ 
        {[Op.like]:`%${name}%`},{[Op.like]:`%${nameCapital}%`},{[Op.like]:`%${nameUpper}%`}
           ]
    }
},
include:[{model:Temperament,as:"temperament"}]
})

}else{
allDogs= await axios("https://api.thedogapi.com/v1/breeds?api_key=84d26e3b-a7b0-4757-a8a8-4c0555bf8b64")
filterAllDogs=allDogs.data
filterAllDogsDB= await Dog.findAll({include:[{model:Temperament,as:"temperament"}]})
}
let allDogsResult= filterAllDogs.map(dog=>{
  if (dog.reference_image_id){
return  {id:dog.id,
        name:dog.name,
        image:"https://cdn2.thedogapi.com/images/"+dog.reference_image_id+".jpg",
        height:dog.height.metric,
        weight:dog.weight.metric,
        life_span:dog.life_span,
        temperament:dog.temperament
        }
      }
      
 return  {id:dog.id,
  name:dog.name,
  image:"placeholder",
  height:dog.height.metric,
  weight:dog.weight.metric,
  life_span:dog.life_span,
  temperament:dog.temperament
}    
})
///////////////////////////////////Transformador de Array a String para Temperamentos///////////////////
filterAllDogsDB2= filterAllDogsDB.map(dog=>{
let reducido= dog.temperament.reduce((prev,curr)=>{
  if (typeof(prev)==="string")return prev+', '+curr.name
  return prev.name+', '+curr.name
  })
  let dog2={ id:dog.id,
    name:dog.name,
    image:dog.image,
    height:dog.height,
    weight:dog.weight,
    life_span:dog.life_span,
    temperament:reducido
      }
  
return dog2
  
})
//////////////////////////////////////////Ordenamiento alfabetico////////////////////
allDogsResult=[...filterAllDogsDB2,...allDogsResult]
allDogsResult.sort((a,b)=>{
if (a.name > b.name) return 1;
else if(a.name < b.name)return -1;
else return 0;
})
return allDogsResult

}

module.exports= GetDogs;