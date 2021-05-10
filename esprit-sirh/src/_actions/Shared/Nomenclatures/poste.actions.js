import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";
export const posteActions = {
    
    allPostes,
    
};

function allPostes() {
    return dispatch => {
    NomenclaturesService.getAllPostes().then(

        resp =>{
            localStorage.setItem('postes',JSON.stringify(resp.data));
            dispatch(all(resp.data));
        });
    };
    function all(postes) { return { type: NomenclaturesConstants.GETALL_POSTES, postes } }
}

