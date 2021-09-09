import { PURGE } from 'redux-persist/es/constants';
import { ignorerEtapeConstants } from '../../_constants/ignorer.etape.constants';

export function ignorerRecherche(state = {}, action) {
  switch (action.type) {
    case ignorerEtapeConstants.IGNORER_RECHERCHE:
      return {
        ignorerRecherche : action.ignorerRecherche
      };
      case PURGE:
        return {};
    default:
      return state
  }
}