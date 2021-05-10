import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const typeCondidatureActions = {
    
    allTypesCondidatures,
    
};

function allTypesCondidatures() {
    return dispatch => {
    NomenclaturesService.getAllTypesCondidatures().then(

        resp =>{
            localStorage.setItem('typeCondidatures',JSON.stringify(resp.data));
            dispatch(all(resp.data));
        });
    };
    function all(types) { return { type: NomenclaturesConstants.GETALL_TYPES_CONDIDATURES, types } }
}
