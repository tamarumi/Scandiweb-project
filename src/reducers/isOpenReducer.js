import { IS_OPEN } from "../actions/types";

const initialState = {
    open : false
}

const isOpenReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_OPEN:
           return {open: !state.open}
        default : 
           return state
    }
}

export default isOpenReducer;