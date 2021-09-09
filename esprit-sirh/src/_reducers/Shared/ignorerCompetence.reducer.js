import { PURGE } from 'redux-persist/es/constants';
import { ignorerEtapeConstants } from '../../_constants/ignorer.etape.constants';

export function ignorerCompetence(state = {}, action) {
  switch (action.type) {
    case ignorerEtapeConstants.IGNORER_COMPETENCES:
      return {
        ignorerCpt : action.ignorerCpt
      };
      case PURGE:
        return {};
    default:
      return state
  }
}