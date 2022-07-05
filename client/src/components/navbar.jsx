import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllDogsTemperament,filterTemp, orderTheDogs, filterApiDB } from "../redux/actions";

export default function NavBar(){
    
let [search,setSearch]=useState("");
let dispatch=useDispatch();
function Search(){
dispatch(getAllDogs(search))
}
let temperamentos=useSelector(state=> state.temps)
useEffect(()=>{dispatch(getAllDogsTemperament())},[dispatch])
return(
    <React.Fragment>
        <div>
            <input name="SearchInput" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Ingrese nombre de la raza de perro"/>
            <button onClick={()=>{let pag0=document.getElementById("pagina0")
            pag0.click()
            Search()
            
            }}>Buscar</button>
            <select onChange={e=>{dispatch(filterTemp(e.target.value))
            let pag0=document.getElementById("pagina0")
            pag0.click()
            }} name="temperaments" id="temp">
                <option value="">Cualquiera</option>
                {temperamentos.map(temp=>{
                  return  <option key={temp.id} value={temp.name}>{temp.name}</option>
                })}
            </select>
            <select onChange={e=>{dispatch(filterApiDB(e.target.value))
            let pag0=document.getElementById("pagina0")
            pag0.click()
            }} name="order" id="orderBy">
                <option value="BOTH">BOTH</option>
                <option value="API">Api</option>
                <option value="DB">DB</option>
                </select>
            <select onChange={e=>{dispatch(orderTheDogs(e.target.value))
            let pag0=document.getElementById("pagina0")
            pag0.click()
            }} name="order" id="orderBy">
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="kg-KG">kg-KG</option>
                <option value="KG-kg">KG-kg</option>
            </select>
        </div>
    

    </React.Fragment>
)    
}