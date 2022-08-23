import { GET_CURRENCY } from "../actions/types";

const initialState = {
    currency : []
}

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCY : 
        return {
            ...state,
            currency: action.payload
         } 
        default:
            return state
    }
}

export default currencyReducer;