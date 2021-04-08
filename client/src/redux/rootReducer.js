import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import cartReducer from './cart/cartReducer'
import productReducer from './product/productReducer'
import orderReducer from './viewOrder/orderReducer'



const rootReducer=combineReducers({
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    view_order: orderReducer,
})


export default rootReducer