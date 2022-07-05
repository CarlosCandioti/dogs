import { FILTER_ALL_DOGS, FILTER_API_DB, GET_ALL_DOGS, GET_ALL_TEMPS,ORDER_ALL_DOGS} from "./actiontypes";
const initialState={
    dogs:[],
    temps:[],
    filter:"",
    filterApiDB:""
 }

function reducer(state=initialState,{type,payload}){
switch (type){
    case GET_ALL_DOGS:{
       return {...state, dogs:payload}
}
case GET_ALL_TEMPS:{
   return {...state,temps:payload}
}
case FILTER_ALL_DOGS:
   return {...state,filter:payload}
   case FILTER_API_DB:
   return {...state,filterApiDB:payload}
case ORDER_ALL_DOGS:
   return {...state,order:payload}
   default:
        return {...state}

}

}

export default reducer;