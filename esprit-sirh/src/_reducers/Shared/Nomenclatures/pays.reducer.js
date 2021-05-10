import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  pays: [] };
export function pays(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_PAYS:
            return {

                pays: action.pays,

            };

       
        default:
            return state
    }
}