

import { PURGE } from 'redux-persist/es/constants';
import { valideEtapeConstants } from '../../_constants/valide.etape.Constants';

export function validerEtapeDocuments(state = {}, action) {
    switch (action.type) {

        case valideEtapeConstants.VALIDE_DOCUMENTS:
            return {
                validateDocuments: action.validateDocuments,
            };
        case PURGE:
            return {};
        default:
            return state
    }
}