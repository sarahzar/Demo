import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const etablissementActions = {
    
    allEtablissements,
    
};

function allEtablissements() {
    return dispatch => {
    NomenclaturesService.getAllEtablissement().then(

        resp =>{
            dispatch(all(resp.data));
        });
    };
    function all(etablissements) { return { type: NomenclaturesConstants.GETALL_ETABLISSEMENTS, etablissements } }
}
