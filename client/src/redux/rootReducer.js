import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import cartReducer from './cart/cartReducer'
import productReducer from './product/productReducer'



const rootReducer=combineReducers({
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
})


export default rootReducer