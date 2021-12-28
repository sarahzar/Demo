import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const specialiteActions = {

    allSpecialites,

};

function allSpecialites() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllSpecialites().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(specialites) { return { type: NomenclaturesConstants.GETALL_SPECIALITES, specialites } }
}
