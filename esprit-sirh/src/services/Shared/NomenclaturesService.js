import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

class NomenclaturesService{

   getAllPostes(){
     
      return axios.get(API_URL + 'allPostes')
     
   }

   getAllTypesCondidatures(){
     
      return axios.get(API_URL + 'allCandidaturesTypes')
     
   }

   getAllDiplomes(){
     
      return axios.get(API_URL + 'allDiplomes')
     
   }

   getAllDomaines(){
     
      return axios.get(API_URL + 'allDomaines')
     
   }

   getAllEtablissement(){
     
      return axios.get(API_URL + 'allEtablissement')
     
   }

   getAllEtatCivil(){
     
      return axios.get(API_URL + 'allEtatCivil')
     
   }

   getAllSpecialites(){
     
      return axios.get(API_URL + 'allSpecialite')
     
   }
   getAllPays(){
     
      return axios.get(API_URL + 'allPays')
     
   }
   getAllModules(){
     
      return axios.get(API_URL + 'allModules')
     
   }

   getSavedEtatCivils(){
      return JSON.parse(localStorage.getItem('etatCivils'));
   }
   getSavedDiplomes(){
      return JSON.parse(localStorage.getItem('diplomes'));
   }
   getSavedDomaines(){
      return JSON.parse(localStorage.getItem('domaines'));
   }
   getSavedEtablissements(){
      return JSON.parse(localStorage.getItem('etablissements'));
      
   }
   getSavedSpecialites(){
      return JSON.parse(localStorage.getItem('specialites'));
   }
   getSavedTypesCondidatures(){
      return JSON.parse(localStorage.getItem('typeCondidatures'));
   }
   getSavedPostes(){
      return JSON.parse(localStorage.getItem('postes'));
   }
   getSavedPays(){
      return JSON.parse(localStorage.getItem('pays'));
   }
   getSavedModules(){
      return JSON.parse(localStorage.getItem('modules'));
   }

}
export default new NomenclaturesService();