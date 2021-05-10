import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const etatCivilActions = {
    
    allEtatCivil,
    
};

function allEtatCivil() {
    return dispatch => {
    NomenclaturesService.getAllEtatCivil().then(

        resp =>{
            localStorage.setItem('etatCivils',JSON.stringify(resp.data));
            dispatch(all(resp.data));
        });
    };
    function all(etatCivils) { return { type: NomenclaturesConstants.GETALL_ETAT_CIVIL, etatCivils } }
}
