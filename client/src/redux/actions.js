import axios from 'axios'
import { FILTER_ALL_DOGS, FILTER_API_DB, GET_ALL_DOGS ,GET_ALL_TEMPS, ORDER_ALL_DOGS} from './actiontypes'

export function getAllDogs(query=""){
    return (dispatch)=>{
       
        return axios.get(`http://localhost:3001/dogs?name=${query}`)
        .then(res=>{
            dispatch({type:GET_ALL_DOGS , payload:res.data})}).catch(e=>console.log(e))
    }
}

 export function getAllDogsTemperament(){

return (dispatch)=>{

    return axios.get(`http://localhost:3001/temperaments`)
    .then(res=>{
dispatch({type:GET_ALL_TEMPS, payload:res.data})}).catch(e=>console(e))
}
}

export function filterTemp(tempfiltrador){
return {type:FILTER_ALL_DOGS, payload:tempfiltrador}

}
export function filterApiDB(apiDBfiltrador){
    return {type:FILTER_API_DB, payload:apiDBfiltrador}
    
    }

export function orderTheDogs(orderBy){
return {type:ORDER_ALL_DOGS, payload:orderBy}

}