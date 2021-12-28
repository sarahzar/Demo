import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const typeCondidatureActions = {

    allTypesCondidatures,

};

function allTypesCondidatures() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllTypesCondidatures().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(types) { return { type: NomenclaturesConstants.GETALL_TYPES_CONDIDATURES, types } }
}
