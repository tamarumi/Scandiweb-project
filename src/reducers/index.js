import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import isOpenReducer from "./isOpenReducer";
import selectedValueReducer from "./selectedValueReducer"

const rootReducer = combineReducers({
    currency: currencyReducer, 
    open: isOpenReducer,
    selectedValue: selectedValueReducer
})

export default rootReducer;
