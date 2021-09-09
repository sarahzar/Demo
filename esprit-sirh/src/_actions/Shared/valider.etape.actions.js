import { valideEtapeConstants } from '../../_constants/valide.etape.Constants';
export const validerEtapeActions = {
   
    validerProfile,
    validerParcours,
    validerDocuments,
    terminerInscription

}

function validerProfile(value){
    return dispatch => {
    dispatch(validerProfileValue(value));
    };
}
function validerParcours(value){
    return dispatch => {
    dispatch(validerParcoursValue(value));
    };
}
function validerDocuments(value){
    return dispatch => {
    dispatch(validerDocumentsValue(value));
    };
}
function terminerInscription(value){
    return dispatch => {
    dispatch(terminerInscriptionValue(value));
    };
}
function validerProfileValue(validateProfile) { return { type: valideEtapeConstants.VALIDE_PROFILE, validateProfile } }
function validerParcoursValue(validateParcours) { return { type: valideEtapeConstants.VALIDE_PARCOURS, validateParcours } }
function validerDocumentsValue(validateDocuments) { return { type: valideEtapeConstants.VALIDE_DOCUMENTS, validateDocuments } }
function terminerInscriptionValue(validateInscrit) { return { type: valideEtapeConstants.TERMINER_INSCRIPTION, validateInscrit } }