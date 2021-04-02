import Axios from 'axios'
import { CART__ITEM, CART__TEST,CART } from './cartType'



export const cartItem=(cartItem)=>{
    return {
        type: CART__TEST,
        payload: cartItem
    }
}
export const cartQuantity=(cartQuantity)=>{
    return {
        type: CART__ITEM,
        payload: cartQuantity
    }
}
export const cart=(cart)=>{
    return {
        type: CART,
        payload: cart
    }
}

export  const cartAction=()=>{
    
    return(dispatch)=>{
        
        Axios.get('/cart/view-cart',{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("auth_token")
            }
        })
        .then(result=>{
            let x=0;
        for (let i = 0; i < result.data.result[0].cartItem.length; i++) {
          x=x+result.data.result[0].cartItem[i].quantity
        }
            dispatch(cartItem(result.data.result[0].cartItem))
            dispatch(cartQuantity(x))
            //console.log(result.data.result[0].cartItem)
        })
        .catch(err=>{
            console.log(err)
        })
    }

}


export const addToCart=(productId,quantity)=>{
    return (dispatch)=>{
        const prod_info = {
            productId,
            quantity
          }
        Axios.post("/cart/add-to-cart", prod_info, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token"),
            },
          })
      
            .then((result) => {
              console.log(result.data.cart__result);
              dispatch(cartAction())
              
            })
            .catch((err) => {
              console.log(err);
            });
    }
}