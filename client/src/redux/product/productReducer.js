import { GET_PRODUCT, SEARCH_PRODUCT } from "./productType"

const init={
    product:[]
}

const productReducer=(state=init,action)=>{
    switch(action.type){
        case GET_PRODUCT: return{
            product: action.payload
        }

        case SEARCH_PRODUCT:return{
            product: action.payload
        }

        default : return state
    }
}

export default productReducer