import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const paysActions = {

    allPays,

};

function allPays() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllPays().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(pays) { return { type: NomenclaturesConstants.GETALL_PAYS, pays } }
}