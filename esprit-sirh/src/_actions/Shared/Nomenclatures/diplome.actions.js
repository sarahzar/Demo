import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const diplomeActions = {

    allDiplomes,

};

function allDiplomes() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllDiplomes().then(

                    resp => {
                        dispatch(all(resp.data));
                    })
            }
        })
    };
    function all(diplomes) { return { type: NomenclaturesConstants.GETALL_DIPLOMES, diplomes } }
}
