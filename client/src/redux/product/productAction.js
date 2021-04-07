import { GET_PRODUCT } from "./productType"
import Axios from 'axios'


export const getProduct=(productInfo)=>{
    return{
        type: GET_PRODUCT,
        payload: productInfo
    }
}

export const productAction=()=>{
    return(dispatch)=>{
        Axios.get("/product/get-product"
            )
        .then(result=>{
            
            
            dispatch(getProduct(result.data.result))
            //console.log(result.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}