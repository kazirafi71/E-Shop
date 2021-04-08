import { GET_ORDER } from "./orderTypes"
import Axios from 'axios'



export const getOrder=(oderInfo)=>{
    return{
        type: GET_ORDER,
        payload: oderInfo
    }
}


export const fetchOder=()=>{
    return(dispatch)=>{
        Axios.get('/payment/view-order',{
            headers: {
                "authorization":"Bearer "+localStorage.getItem("auth_token")
            }
        })
        
        .then(result=>{
            //console.log(result.data.order)
            dispatch(getOrder(result.data.order))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}