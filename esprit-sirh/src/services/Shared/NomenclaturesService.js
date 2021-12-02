import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

class NomenclaturesService {

   getAllPostes() {

      return axios.get(API_URL + 'allPostes')

   }

   getAllTypesCondidatures() {

      return axios.get(API_URL + 'allCandidaturesTypes')

   }

   getAllDiplomes() {

      return axios.get(API_URL + 'allDiplomes')

   }

   getAllDomaines() {

      return axios.get(API_URL + 'allDomaines')

   }

   getAllEtablissement() {

      return axios.get(API_URL + 'allEtablissement')

   }

   getAllEtatCivil() {

      return axios.get(API_URL + 'allEtatCivil')

   }

   getAllSpecialites() {

      return axios.get(API_URL + 'allSpecialite')

   }
   getAllPays() {

      return axios.get(API_URL + 'allPays')

   }
   getAllModules() {

      return axios.get(API_URL + 'allModules')

   }

}
export default new NomenclaturesService();