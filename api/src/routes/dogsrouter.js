const {Router}=require ('express');
const GetDogs= require('./controllers/getDogRoutercontroller.js')
const PostDogs= require('./controllers/postDogRouterController.js')
const getDogByID=require('./controllers/getByIdController')
const dogsRouter= Router();


dogsRouter.get("/:idRaza", async(req,res,next)=>{
  try {
    const {idRaza}=req.params;
   
    let dogByID= await getDogByID(idRaza);
    console.log(dogByID)
    res.send(dogByID)

  } catch (error) {
    next(error)
  }
})


dogsRouter.get("/", async(req,res,next)=>{
try {
  const {name}=req.query
   let Dogs= await GetDogs(name); 
  res.send(Dogs) 
} catch (error) {
    next(error)
}
});



dogsRouter.post("/", async(req,res,next)=>{
try {
  const {name,image,height,weight,life_span,temperaments}=req.body
  console.log(name)
  console.log(req.body)
let DogsCreated= await PostDogs(name,image,height,weight,life_span,temperaments)
res.send(DogsCreated)

} catch (error) {
 next(error) 
}

})
module.exports = dogsRouter;