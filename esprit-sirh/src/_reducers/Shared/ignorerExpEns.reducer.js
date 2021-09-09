import { PURGE } from 'redux-persist/es/constants';
import { ignorerEtapeConstants } from '../../_constants/ignorer.etape.constants';

export function ignorerExpEns(state = {}, action) {
  switch (action.type) {
    case ignorerEtapeConstants.IGNORER_EXP_ENS:
      return {
        ignorerExpEns : action.ignorerExpEns
      };
      case PURGE:
        return {};
    default:
      return state
  }
}