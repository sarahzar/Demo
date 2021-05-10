import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  modules: [] };
export function module(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_MODULES:
            return {

                modules: action.modules,

            };

       
        default:
            return state
    }
}