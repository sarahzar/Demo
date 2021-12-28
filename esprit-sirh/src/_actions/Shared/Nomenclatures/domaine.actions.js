import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const domaineActions = {

    allDomaines,

};

function allDomaines() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllDomaines().then(

                    resp => {
                        dispatch(all(resp.data));
                    })
            }
        })
    };
    function all(domaines) { return { type: NomenclaturesConstants.GETALL_DOMAINES, domaines } }
}
