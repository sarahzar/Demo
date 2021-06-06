import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const paysActions = {
    
    allPays,
    
};

function allPays() {
    return dispatch => {
    NomenclaturesService.getAllPays().then(

        resp =>{
            dispatch(all(resp.data));
        });
    };
    function all(pays) { return { type: NomenclaturesConstants.GETALL_PAYS, pays } }
}