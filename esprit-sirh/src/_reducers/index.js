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
const rootReducer = combineReducers({
  authentication,
  // registration,
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
  module
});

export default rootReducer;