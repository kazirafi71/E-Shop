import { SET_USER,CLEAR_USER } from "./authTypes"


const initialState={
    user:{},
    isAuthenticated: false,
    error: ''
}

const authReducer=(state= initialState, action)=>{
    switch (action.type){
            case SET_USER:{
                return{
                    isAuthenticated: true,
                    user:action.payload,
                    error:''
                }
            }
            case CLEAR_USER:{
                return{
                    isAuthenticated: false,
                    user:{},
                    error:''
                }
            }
            

        default : return state
    }
}


export default authReducer