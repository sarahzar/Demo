import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const modulesActions = {

    allModules,

};

function allModules() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllModules().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(modules) { return { type: NomenclaturesConstants.GETALL_MODULES, modules } }
}