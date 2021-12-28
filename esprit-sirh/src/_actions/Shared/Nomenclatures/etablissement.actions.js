import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { subscriber } from '../../../services/Shared/BehaviorSubjects';

export const etablissementActions = {

    allEtablissements,

};

function allEtablissements() {
    return dispatch => {
        subscriber.subscribe(v => {
            if (v) {
                NomenclaturesService.getAllEtablissement().then(

                    resp => {
                        dispatch(all(resp.data));
                    });
            }
        })
    };
    function all(etablissements) { return { type: NomenclaturesConstants.GETALL_ETABLISSEMENTS, etablissements } }
}
