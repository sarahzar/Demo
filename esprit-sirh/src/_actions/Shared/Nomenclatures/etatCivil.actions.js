import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const etatCivilActions = {

    allEtatCivil,

};

function allEtatCivil() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllEtatCivil().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(etatCivils) { return { type: NomenclaturesConstants.GETALL_ETAT_CIVIL, etatCivils } }
}
