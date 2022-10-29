import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import onHoverReducer from "./hoverReducer";
import isOpenReducer from "./isOpenReducer";
import selectedValueReducer from "./selectedValueReducer";

const rootReducer = combineReducers({
    currency: currencyReducer, 
    open: isOpenReducer,
    selectedValue: selectedValueReducer,
    hover: onHoverReducer,
})

export default rootReducer;
