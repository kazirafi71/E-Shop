const { GET_ORDER } = require("./orderTypes")

const init={
    oderDetails:[]
}

const orderReducer=(state=init, action)=>{
    switch(action.type){
        case GET_ORDER: return{
            oderDetails: action.payload
        }

        default: return state
    }
}

export default orderReducer