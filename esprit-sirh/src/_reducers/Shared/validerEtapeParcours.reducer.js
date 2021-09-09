

import { PURGE } from 'redux-persist/es/constants';
import { valideEtapeConstants } from '../../_constants/valide.etape.Constants';

export function validerEtapeParcours(state = {}, action) {
    switch (action.type) {
    
        case valideEtapeConstants.VALIDE_PARCOURS:
            return {
                validateParcours: action.validateParcours,
            };
       
        case PURGE:
            return {};
        default:
            return state
    }
}