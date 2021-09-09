

import { PURGE } from 'redux-persist/es/constants';
import { valideEtapeConstants } from '../../_constants/valide.etape.Constants';

export function terminerInscription(state = {}, action) {
    switch (action.type) {
    
        case valideEtapeConstants.TERMINER_INSCRIPTION:
            return {
                validateInscrit: action.validateInscrit,
            };
       
        case PURGE:
            return {};
        default:
            return state
    }
}