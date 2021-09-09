import { condidatConstants } from '../../_constants/condidat.constants';

export const condidatActions = {
    setCondidat,
}

function setCondidat(condidatReducer){
    return dispatch => {
        dispatch(updateCondidat(condidatReducer))
    };
}
function updateCondidat(condidatReducer) { return { type: condidatConstants.SET_CONDIDAT, condidatReducer } }
