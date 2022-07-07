import React from "react";
import { NavLink } from "react-router-dom";
import '../components/css/card.css'
export default function Card({name,image,temperament,weight,id}){

    return ( <React.Fragment>
        <div className="Card">
        <div> <NavLink to={`./detail/${id}`} >{`${name}`}</NavLink>  </div>
        <div> <img className="image_dog" src={`${image}`} alt={`${name}`} /> </div>
        <div> <span>{`${temperament}`}</span> </div>
        <div> <span>Peso(kg):{`${weight}`}</span> </div>
        </div>
        </React.Fragment>)
}