import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

class NomenclaturesService {

   getAllPostes() {

      return axios.get(API_URL + 'private/allPostes', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

   getAllTypesCondidatures() {

      return axios.get(API_URL + 'private/allCandidaturesTypes', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

   getAllDiplomes() {

      return axios.get(API_URL + 'private/allDiplomes', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

   getAllDomaines() {

      return axios.get(API_URL + 'private/allDomaines', {
      params: {
        access_token: localStorage.getItem("token"),
      }
    })

   }

   getAllEtablissement() {

      return axios.get(API_URL + 'private/allEtablissement', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

   getAllEtatCivil() {

      return axios.get(API_URL + 'private/allEtatCivil', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

   getAllSpecialites() {

      return axios.get(API_URL + 'private/allSpecialite', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }
   getAllPays() {

      return axios.get(API_URL + 'private/allPays', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }
   getAllModules() {

      return axios.get(API_URL + 'private/allModules', {
        params: {
          access_token: localStorage.getItem("token"),
        }
      })

   }

}
export default new NomenclaturesService();