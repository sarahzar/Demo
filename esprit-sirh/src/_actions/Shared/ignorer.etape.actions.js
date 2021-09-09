
import { ignorerEtapeConstants } from '../../_constants/ignorer.etape.constants';
export const ignorerEtapeActions = {

    ignorerExpEns,
    ignorerExpPro,
    ignorerCompetence,
    ignorerRecherche,
}

function ignorerExpEns(value){
    return dispatch => {
    dispatch(ignorerExpEnsValue(value));
    };
}


function ignorerExpPro(value){
    return dispatch => {
    dispatch(ignorerExpProValue(value));
    };
}


function ignorerCompetence(value){
    return dispatch => {
    dispatch(ignorerCompetenceValue(value));
    };
}


function ignorerRecherche(value){
    return dispatch => {
    dispatch(ignorerRechercheValue(value));
    };
}

function ignorerExpEnsValue(ignorerExpEns) { return { type: ignorerEtapeConstants.IGNORER_EXP_ENS, ignorerExpEns } }
function ignorerExpProValue(ignorerExpPro) { return { type: ignorerEtapeConstants.IGNORER_EXP_PRO, ignorerExpPro } }
function ignorerCompetenceValue(ignorerCpt) { return { type: ignorerEtapeConstants.IGNORER_COMPETENCES, ignorerCpt } }
function ignorerRechercheValue(ignorerRecherche) { return { type: ignorerEtapeConstants.IGNORER_RECHERCHE, ignorerRecherche } }



