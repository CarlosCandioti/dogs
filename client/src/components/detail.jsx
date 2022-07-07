import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllDogs} from '../redux/actions'
import { NavLink, useParams } from "react-router-dom";
import './css/detail.css'

export default function Detail(){
let dispatch=useDispatch()
 let {id} =useParams();
  let dogs=useSelector(state=> state.dogs)
 useEffect(()=>{dispatch(getAllDogs())},[dispatch])

return(
    <React.Fragment>
        <div className="cabecera">
            <NavLink to="/home">Home</NavLink>
        </div>
     <div>
{dogs.map(dog=>{
if(dog.id.toString()===id)
return (
    <div className="detail">
    <div>Raza:<br/>{dog.name}</div><br/>    
    <div><img className="image_dog_big" src={`${dog.image}`} alt={`${dog.name}`} /></div>
    <div>Altura:<br/>{dog.height}</div>
    <div>Peso<br/>{dog.weight}</div>
    <div>Esperanza de vida:<br/>{dog.life_span}</div>
    <div>Temperamento:<br/>{dog.temperament}</div>
    </div>
)
})}

     </div>
    </React.Fragment>


)

}