import { PURGE } from 'redux-persist/es/constants';
import { ignorerEtapeConstants } from '../../_constants/ignorer.etape.constants';

export function ignorerExpPro(state = {}, action) {
  switch (action.type) {
    case ignorerEtapeConstants.IGNORER_EXP_PRO:
      return {
        ignorerExpPro : action.ignorerExpPro
      };
      case PURGE:
        return {};
    default:
      return state
  }
}