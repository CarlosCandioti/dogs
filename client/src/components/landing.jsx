import React from "react";
import { NavLink } from "react-router-dom";
import './css/landing.css'

export default function Landing (){

return (
<React.Fragment>
    <div className="landing">
     <div><img src="./caraperro.png" alt="" /></div> 
<div><NavLink to={'/home'}> <button > Entrar </button></NavLink></div>
</div>
</React.Fragment>


)


}