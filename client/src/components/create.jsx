import './css/style.css'
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogsTemperament } from "../redux/actions";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Create(){
  let dispatch=useDispatch()
let temps= useSelector(state=>state.temps)
let [dogData,setDogData]=useState({
    name:"",
    image:"",
    height:["",""],
    weight:["",""],
    life_span:["",""],
    temperaments:[]
})
let [errorDog,setErrorDog]=useState({
    name:"",
    image:"",
    height:"",
    weight:"",
    life_span:"",
    temperaments:""
})

useEffect(()=>{
    comprobationEmptyFields();
    dispatch(getAllDogsTemperament())},[dispatch])

//////////////////////////////////regular expresions//////////////////////////////////////////////////
let onlyNumbers=/^([0-9]|([1-9][0-9])|1[0-9][0-9]|200)$/;
let onlyCharacters=/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
let urlImage=/(https?:\/\/.*\.(?:png|jpg))/;


function handleChangeDogData(data){
    
switch(data.name){
case "name":
    if (onlyCharacters.test(data.value)){
   setDogData({...dogData, name:data.value});
   setErrorDog({...errorDog,name:""})
}else{
    setErrorDog({...errorDog,name:"El nombre de la raza contiene carateres o numeros no validos"})
       setDogData({...dogData, name:data.value});
    }
   break
   case "image":
    if(!urlImage.test(data.value) &&data.value!=="") setErrorDog({...errorDog,image:"La url de la imagen no es valida"})
    else setErrorDog({...errorDog,image:""})
    setDogData({...dogData, image:data.value});
    break
    case "height1":
        let height1;
        if (data.value>dogData.height[1]) height1=[data.value,data.value]
        else height1=[data.value,dogData.height[1]]
    if (onlyNumbers.test(data.value)){
        setDogData({...dogData, height:height1});
        setErrorDog({...errorDog,height:""})
    }else{
    setErrorDog({...errorDog,height:"La altura ingresada no es un numero valido"})
    setDogData({...dogData, height:height1});
    }
    break
   case "weight1":
    let weight1;
    if (data.value>dogData.weight[1]) weight1=[data.value,data.value]
    else weight1=[data.value,dogData.weight[1]]
    if (onlyNumbers.test(data.value)){
        setErrorDog({...errorDog,weight:""})
        setDogData({...dogData, weight:weight1});
    }else{
        setErrorDog({...errorDog,weight:"El peso ingresado no es un numero valido"})
        setDogData({...dogData, weight:weight1});
        }
   break
   case "life_span1":

   let life_span1;
        if (data.value>dogData.life_span[1]) life_span1=[data.value,data.value]
        else life_span1=[data.value,dogData.life_span[1]]
    if (onlyNumbers.test(data.value)){
        setErrorDog({...errorDog,life_span:""})
        setDogData({...dogData, life_span:life_span1});
}else{
    setErrorDog({...errorDog,life_span:"La esperanza de vida ingresada no es numero valido"})
    setDogData({...dogData, life_span:life_span1});
    }
   break
   case "height2":
    let height2;
        if (data.value<dogData.height[0]) height2=[data.value,data.value]
        else height2=[dogData.height[0],data.value]
    if (onlyNumbers.test(data.value)){
        setErrorDog({...errorDog,height:""})
        setDogData({...dogData, height:height2});
}else{
    setDogData({...dogData, height:height2});
    setErrorDog({...errorDog,height:"La altura ingresada no es un numero valido"})
    }
     break
    case "weight2":
        let weight2;
        if (data.value<dogData.weight[0]) weight2=[data.value,data.value]
        else weight2=[dogData.weight[0],data.value]
        if (onlyNumbers.test(data.value)){
            setErrorDog({...errorDog,weight:""})
        setDogData({...dogData, weight:weight2});
        }else{
            setErrorDog({...errorDog,weight:"El peso ingresado no es un numero valido"})
            setDogData({...dogData, weight:weight2});
        }
    break
    case "life_span2":
        let life_span2;
        if (data.value<dogData.life_span[0]) life_span2=[data.value,data.value]
        else life_span2=[dogData.life_span[0],data.value]
            setDogData({...dogData, life_span:life_span2});
        if (onlyNumbers.test(data.value)){
            setErrorDog({...errorDog,life_span:""})
        }else{
            setErrorDog({...errorDog,life_span:"La esperanza de vida ingresada no es numero valido"})
            }
    break
   case "temperaments":
   let checkboxes= document.getElementsByName(data.name)
   let tempsCheckeds=[]
    for(let i=0;i<checkboxes.length;i++){
        if (checkboxes[i].checked) tempsCheckeds.push(checkboxes[i].value)
    }
    if(tempsCheckeds.length===0) setErrorDog({errorDog,temperaments:"Al menos un temperamento es requerido"})
    else setErrorDog({errorDog,temperaments:""})
   setDogData({...dogData, temperaments:tempsCheckeds});
   break
   default:
    return
   }
}


function  comprobationEmptyFields(){
    let errores={}
    if(dogData.name==="")errores={...errores,name:"Nombre es requerido"}
    if(dogData.height[0]==="" ||dogData.height[1]==="")  errores={...errores,height:"Altura es requerida"}
    if(dogData.weight[0]==="" || dogData.weight[1]==="")  errores={...errores,weight:"Peso es requerido"}
    if(dogData.life_span[0]==="" || dogData.life_span[1]==="" ) errores={...errores,life_span:"Esperanza de vida es requerida"}
    if(dogData.temperaments.length===0) errores={...errores,temperaments:"Al menos un temperamento es requerido"}
 setErrorDog({...errorDog,...errores})
}

 function handleSubmit(event){
    event.preventDefault();
    comprobationEmptyFields();
         if(!!errorDog.name){
        alert(errorDog.name)
    }else if(!!errorDog.image){
        alert(errorDog.image)
    }else if(!!errorDog.height){
        alert(errorDog.height)
    }else if(!!errorDog.weight){
        alert(errorDog.weight)
    }else if(!!errorDog.life_span){
        alert(errorDog.life_span)
    }else if(!!errorDog.temperaments){
        alert(errorDog.temperaments)
    }else{
    let dogDataSend={...dogData, height:`${dogData.height[0]} - ${dogData.height[1]}`, weight:`${dogData.weight[0]} - ${dogData.weight[1]}`, life_span:`${dogData.life_span[0]} - ${dogData.life_span[1]}`}
    axios.post('http://localhost:3001/dogs', dogDataSend).then(res=> res.data && alert("Nueva raza cargada exitosamente")).catch(e=>alert(e))
    }
}

return(
    <React.Fragment>
<div className='create_page'> 
<div className='cabecera'><div>
    <NavLink to={"/home"}>Home</NavLink>
    </div></div>   
<form className='formulario' onSubmit={(e)=>{handleSubmit(e)}} method='post'>

<div className='franja'>

    <div className='fields'>
    <div>Crea una nueva raza</div><br />
    <div>
    <label htmlFor="name">Nombre de la raza:</label><br />
    <input type={"text"} id="name" name="name" onChange={(e)=>handleChangeDogData(e.target)} value={dogData.name}/>
</div>
<div>
    <label htmlFor="image">Url de la imagén:</label><br />
    <input type="text" id='image' name='image' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.image}/>
</div>
<div>
    <label htmlFor="height">Altura(cm):</label><br />
    <input type="number" className='tamaño_numeros' min="0" max="200" id='height1' name='height1' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.height[0]}/>
    <span> a </span><input type="number" className='tamaño_numeros' min="0" max="200" id='height2' name='height2' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.height[1]}/>
</div>
<div>
    <label htmlFor="weight">Peso(kg):</label><br />
    <input type="number" className='tamaño_numeros' min="0" max="200" id='weight1' name='weight1' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.weight[0]}/>
    <span> a: </span><input type="number" className='tamaño_numeros' min="0" max="200" id='weight2' name='weight2' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.weight[1]}/>
</div>
<div>
    <label htmlFor="life_span">Esperanza de vida(años):</label><br />
    <input type="number" className='tamaño_numeros' min="0" max="100" id='life_span1' name='life_span1' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.life_span[0]}/>
    <span> a: </span><input type="number" className='tamaño_numeros' min="0" max="100" id='life_span2' name='life_span2' onChange={(e)=>handleChangeDogData(e.target)} value={dogData.life_span[1]}/>
</div>
<div className='enviar_div'>
<input type="submit" />
</div> 
</div>
<div className="checkbox_legion">
    <div className='temp_titulo'><span>Temperamentos:</span></div>
   {temps.map(temp=>{
    let print=<div className='etiquetas_check'><input type={"checkbox"} onChange={(e)=>handleChangeDogData(e.target)} className={"checkboxes"} name="temperaments" id={`checkbox${temp.id}`} value={temp.id} /><label  htmlFor={`checkbox${temp.id}`}>{temp.name}</label> </div>
     return print
    }       
    )
    }
</div>
</div>

</form>
</div>
    
    </React.Fragment>
)    
}