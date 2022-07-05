
const {Router}=require ('express');
const getTemperamentsRouterController= require('./controllers/getTemperamentsRouterController.js')
const temperamentsRouter=Router();

temperamentsRouter.get("/", async(req,res,next)=>{
try {
    let temperaments=await getTemperamentsRouterController();
    res.send(temperaments)
} catch (error) {
    next(error)
}

})

module.exports=temperamentsRouter;