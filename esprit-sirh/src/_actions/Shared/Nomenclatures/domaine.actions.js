import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const domaineActions = {
    
    allDomaines,
    
};

function allDomaines() {
    return dispatch => {
    NomenclaturesService.getAllDomaines().then(

        resp =>{
            dispatch(all(resp.data));
        });
    };
    function all(domaines) { return { type: NomenclaturesConstants.GETALL_DOMAINES, domaines } }
}
