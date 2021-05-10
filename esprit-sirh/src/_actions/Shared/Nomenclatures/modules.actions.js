import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from  "../../../services/Shared/NomenclaturesService";

export const modulesActions = {
    
    allModules,
    
};

function allModules() {
    return dispatch => {
    NomenclaturesService.getAllModules().then(

        resp =>{
            localStorage.setItem('modules',JSON.stringify(resp.data));
            dispatch(all(resp.data));
        });
    };
    function all(modules) { return { type: NomenclaturesConstants.GETALL_MODULES, modules } }
}