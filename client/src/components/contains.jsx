import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllDogs} from '../redux/actions'
import Card from './Card.jsx'

export default function Contains(){
  const [pages,setPages]=useState(0)
  const dispatch=useDispatch(); 
  let filter=useSelector(state=>state.filter)
  let dogs=useSelector(state=> state.dogs)
  let order=useSelector(state=>state.order)
 let filApiDB=useSelector(state=>state.filterApiDB)
useEffect(()=>{dispatch(getAllDogs())},[dispatch])

//////////////////////////////////Filtro por Temperamento/////////////////////////////////////
if(filter){
  dogs=dogs.filter(dog=>{ if (dog.temperament) return dog.temperament.includes(filter)
  else return false })
}
if(filApiDB){
  dogs=dogs.filter(dog=>{if (filApiDB==="API"){
   return (typeof(dog.id)==="number")}
   else if (filApiDB==="DB") {return(typeof(dog.id)==="string")}
   else{ return true}
  })
}
////////////////////////////////////Ordenamiento//////////////////////////////////////
switch(order){
  case "Z-A":dogs=dogs.sort((a,b)=>{
  if (a.name > b.name) return -1;
  else if(a.name < b.name)return 1;
  else return 0;
  })
  break
  case "A-Z":dogs=dogs.sort((a,b)=>{
    if (a.name > b.name) return 1;
    else if(a.name < b.name)return -1;
    else return 0;
    })
    break
  case "kg-KG":dogs.sort((a,b)=>{
    let lowestWeightA=parseInt(a.weight.split(" - ")[0])
    let lowestWeightB=parseInt(b.weight.split(" - ")[0])
    if (lowestWeightA > lowestWeightB) return 1;
    else if(lowestWeightA< lowestWeightB)return -1;
    else return 0;
    })
    break
    case "KG-kg":dogs.sort((a,b)=>{
      let lowestWeightA=parseInt(a.weight.split(" - ")[0])
      let lowestWeightB=parseInt(b.weight.split(" - ")[0])
      if (lowestWeightA > lowestWeightB) return -1;
      else if(lowestWeightA< lowestWeightB)return 1;
      else return 0;
      })
      break
 default:break
}


//////////////////////////////////// Cantidad de Paginas//////////////////////////////////
let contPages=0; 
let tPages=0;
let totalPages=[0];
tPages=dogs.length/10;
for(let i=1;i<tPages;i++){
totalPages.push(i)
}


///////////////////////////////////Desactivación de botones//////////////////////////////////
let backward=document.getElementById("backward")
let forward=document.getElementById("forward")
if (backward && forward){
if (pages===0){
  document.getElementById("backward").disabled=true;
  if(totalPages.length===1) document.getElementById("forward").disabled=true;
  else document.getElementById("forward").disabled=false;
}else if (pages===totalPages.length-1){
  document.getElementById("backward").disabled=false;
  document.getElementById("forward").disabled=true;

}else{
  document.getElementById("backward").disabled=false;
  document.getElementById("forward").disabled=false;
}
}
return(
    <React.Fragment>
<button  id="backward" onClick={(e)=>{
  document.getElementById(`pagina${pages}`).disabled=false
   setPages(pages-1)
   document.getElementById(`pagina${pages-1}`).disabled=true
     }}>{"<"}</button>
{totalPages.map(id=>{
 return <button id={`pagina${id}`} onClick={(e)=>{setPages(id)
  totalPages.map((botonNumero)=>{
  document.getElementById(`pagina${botonNumero}`).disabled=false
  })
   e.target.disabled=true}}>{id+1}</button> 
})}

<button id="forward" onClick={(e)=>{
  document.getElementById(`pagina${pages}`).disabled=false
  setPages(pages+1)
  document.getElementById(`pagina${pages+1}`).disabled=true
}}>{">"}</button>



{dogs.map(dog=>{
  contPages++
  if ((pages*10)<=contPages && ((pages*10)+10)>=contPages){
    return (<Card key={dog.id} weight={dog.weight} name={dog.name} />
  )}})}
    </React.Fragment>
)    
}