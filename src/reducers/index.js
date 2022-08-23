import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import isOpenReducer from "./isOpenReducer";

const rootReducer = combineReducers({
    currency: currencyReducer, 
    open: isOpenReducer,
})

export default rootReducer;
