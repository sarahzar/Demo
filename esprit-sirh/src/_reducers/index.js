import { combineReducers } from 'redux';

import { authentication } from './Authentification/authentication.reducer';
import { registration } from './Authentification/registration.reducer';
import { users } from './Authentification/users.reducer';
import { alert } from './Shared/alert.reducer';
import { poste } from './Shared/Nomenclatures/poste.reducer';
import { diplome } from './Shared/Nomenclatures/diplome.reducer';
import { domaine } from './Shared/Nomenclatures/domaine.reducer';
import { etablissement } from './Shared/Nomenclatures/etablissement.reducer';
import { specialite } from './Shared/Nomenclatures/specialite.reducer';
import { etatCivil } from './Shared/Nomenclatures/etatCivil.reducer';
import { typeCondidature } from './Shared/Nomenclatures/typeCondidature.reducer';
import { pays } from './Shared/Nomenclatures/pays.reducer';
import { module } from './Shared/Nomenclatures/module.reducer';
import { ignorerExpEns } from './Shared/ignorerExpEns.reducer';
import { ignorerCompetence } from './Shared/ignorerCompetence.reducer';
import { ignorerExpPro } from './Shared/ignorerExpPro.reducer';
import { ignorerRecherche } from './Shared/ignorerRecherche.reducer';
import { condidat } from './Shared/condidat.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { validerEtapeParcours } from './Shared/validerEtapeParcours.reducer';
import { validerEtapeDocuments } from './Shared/validerEtapeDocuments.reducer'; 
import { terminerInscription } from './Shared/terminerInscription.reducer'; 


const persistConfig ={
  key: 'root',
  storage,
  whitelist : [
  'poste',
  'diplome',
  'etablissement',
  'specialite',
  'etatCivil',
  'typeCondidature',
  'domaine',
  'pays',
  'module',
  'ignorerExpEns',
  'ignorerCompetence',
  'ignorerExpPro',
  'ignorerRecherche',
  'condidat',
  'validerEtapeParcours',
  'validerEtapeDocuments',
  'terminerInscription',
  
]

}

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  poste,
  diplome,
  etablissement,
  specialite,
  etatCivil,
  typeCondidature,
  domaine,
  pays,
  module,
  ignorerExpEns,
  ignorerCompetence,
  ignorerExpPro,
  ignorerRecherche,
  condidat,
  validerEtapeParcours,
  validerEtapeDocuments,
  terminerInscription,
});

export default persistReducer(persistConfig,rootReducer);