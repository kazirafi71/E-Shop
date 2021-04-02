const {
    CART__ITEM, CART__TEST, CART
} = require("./cartType")

const initialCart = {
    cartItem: {},
    quantity:0,
    view_cart:[]
}

const cartReducer = (state = initialCart, action) => {
    //console.log(action)
    switch (action.type) {
    
        case CART__ITEM:

            return {
                ...state,
                quantity: action.payload

            }
        
            case CART__TEST:return{
                ...state,
                view_cart: action.payload
            }
            case CART:return{
                ...state,
                quantity: action.payload
            }

            default:
                return state
    }
}


export default cartReducer