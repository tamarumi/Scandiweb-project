import { GET_CURRENCY } from "./types";

export const currency = (currencyArray) => {
    return{
        type: "GET_CURRENCY",
        currencyArray
 }
}
 