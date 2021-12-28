import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const posteActions = {

    allPostes,

};

function allPostes() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllPostes().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(postes) { return { type: NomenclaturesConstants.GETALL_POSTES, postes } }
}

