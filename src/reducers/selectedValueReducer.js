
import { SELECTEDVALUE } from "../actions/types";

const initialState = {
    selectedValue : "$"
}

const selectedValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTEDVALUE : 
        return {
            ...state,
            selectedValue: action.payload
         } 
        default:
            return state
    }
}

export default selectedValueReducer;