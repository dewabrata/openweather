import { combineReducers } from "redux"

const initialGlobalState={
        latitude:0.0,
        longitude:0.0 ,
        data:{},
        icon:"",
        city:"",
        temp: "32C",
        humidity: 85,
        data: {},
}


const GlobalReducer = (state= initialGlobalState, action) => {
    if (action.type === "SET_GLOBAL") {
        return{
            ...state,
            [action.tipeInput] : action.valueInput 
        }
    }
    return state
}

const Reducer = combineReducers({
    GlobalReducer
})

export default Reducer;